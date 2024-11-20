import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';
import { spotifyAPI } from '@/lib/spotify-api';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    spotifyAPI.setTokens({
      accessToken: session.accessToken as string,
      refreshToken: session.refreshToken as string,
      expiresAt: Date.now() + 3600 * 1000, // 1 hour from now
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in Spotify auth:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}