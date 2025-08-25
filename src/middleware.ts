import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;

    const authToken = request.cookies.get('auth_token')?.value;
    const userRole = request.cookies.get('role')?.value;

    const response = NextResponse.next();

    response.headers.set('x-auth-status', authToken ? 'authenticated' : 'guest');
    response.headers.set('x-user-role', userRole || 'none');

    if (request.nextUrl.pathname.startsWith('/api/auth')) {
        response.headers.set('x-auth-change', 'true');
    }

    if (
        (pathname === '/dashboard/professional' ||
            pathname === '/dashboard/user' ||
            pathname === '/dashboard/admin' ||
            pathname.startsWith('/professionalProfile') ||
            pathname === '/search-professionals' ||
            pathname.startsWith('/userProfile/') ||
            pathname.startsWith('/session/')) &&
        !authToken
    ) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }

    if ((pathname === '/login' || pathname === '/register-user' || pathname === '/register-professional') && authToken) {
        const dashboardUrl = new URL('/', origin);
        return NextResponse.redirect(dashboardUrl);
    }

    if (pathname === '/dashboard/professional' && (userRole === 'Paciente' || userRole === 'Administrador')) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }

    if (pathname === '/dashboard/user' && (userRole === 'Psicólogo' || userRole === 'Administrador')) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }

    if (pathname === '/dashboard/admin' && (userRole === 'Psicólogo' || userRole === 'Paciente')) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }

    return response;
}

export const config = {
    matcher: ['/((?!api/(?!auth)|_next/static|_next/image|favicon.ico).*)'],
};
