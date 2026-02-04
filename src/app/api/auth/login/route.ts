import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { username, password } = await request.json();

        // In a real app, use bcrypt.compare(password, user.password)
        const user = await Admin.findOne({ username });

        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // In a real app, set a strict HTTP-only cookie JWT here.
        // For this simple version, we'll return a success flag and handle "session" in client state/localStorage 
        // or simple cookie, as requested by simplicity.
        const response = NextResponse.json({ success: true, username: user.username });
        response.cookies.set('admin_session', 'true', {
            httpOnly: false, // Allow client reading for simple auth check (secure this in prod)
            path: '/',
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
