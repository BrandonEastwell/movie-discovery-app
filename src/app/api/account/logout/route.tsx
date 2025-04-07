import {NextRequest, NextResponse} from "next/server";
import {AuthService} from "../../../../lib/services/authService";

export async function POST(req: NextRequest) {
    try {
        await AuthService.deleteToken();
        return NextResponse.json({success: true}, {status: 200});
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, {status: 500});
    }
}