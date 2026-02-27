import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    // Simple security check
    if (secret !== 'vidyawadi_refresh_2026') {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    try {
        // This will purge the 'gallery' cache tag
        (revalidateTag as any)('gallery');
        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: 'Gallery cache purged successfully'
        });
    } catch (err: any) {
        return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
    }
}
