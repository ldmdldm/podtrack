import { Redis } from "@upstash/redis";
import { env } from "./env";

const redis = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_REDIS_TOKEN,
});

const TIERS = {
  basic: {
    dataPoints: 5000,
    updateFrequency: 3600, // 1 hour in seconds
    price: 99,
  },
  advanced: {
    dataPoints: 50000,
    updateFrequency: 300, // 5 minutes in seconds
    price: 199,
  },
  enterprise: {
    dataPoints: Infinity,
    updateFrequency: 60, // 1 minute in seconds
    price: 499,
  },
} as const;

class RateLimit {
  private static instance: RateLimit;

  private constructor() {}

  static getInstance(): RateLimit {
    if (!RateLimit.instance) {
      RateLimit.instance = new RateLimit();
    }
    return RateLimit.instance;
  }

  private getKeyPrefix(userId: string) {
    const date = new Date();
    return `analytics:${userId}:${date.getUTCFullYear()}:${date.getUTCMonth() + 1}`;
  }

  async getUserTier(userId: string): Promise<keyof typeof TIERS> {
    const tier = await redis.get<keyof typeof TIERS>(`user:${userId}:tier`);
    return tier || "basic";
  }

  async check(userId: string) {
    const tier = await this.getUserTier(userId);
    const limits = TIERS[tier];
    
    const key = this.getKeyPrefix(userId);
    const usage = await redis.get<number>(key) || 0;

    return {
      success: usage < limits.dataPoints,
      currentUsage: usage,
      limit: limits.dataPoints,
      tier,
      updateFrequency: limits.updateFrequency,
      price: limits.price,
    };
  }

  async increment(userId: string, points: number) {
    const key = this.getKeyPrefix(userId);
    await redis.incrby(key, points);
    
    // Set expiry for the first of next month
    const now = new Date();
    const nextMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 1);
    const ttl = Math.floor((nextMonth.getTime() - now.getTime()) / 1000);
    await redis.expire(key, ttl);
  }
}

export const rateLimit = RateLimit.getInstance();