import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;

    // Verificar tanto authToken (login normal) como auth_token (Google OAuth)
    const hasAuthToken = request.cookies.get('authToken') || request.cookies.get('auth_token');

    if (
        (pathname === '/dashboard/professional' ||
            pathname === '/dashboard/user' ||
            pathname === '/dashboard/admin' ||
            pathname.startsWith('/professionalProfile') ||
            pathname === '/search-professionals' ||
            pathname.startsWith('/userProfile/') ||
            pathname.startsWith('/session/')) &&
        !hasAuthToken
    ) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }

    if ((pathname === '/login' || pathname === '/register-user' || pathname === '/register-professional') && request.cookies.get('authToken')) {
        const dashboardUrl = new URL('/', origin);
        return NextResponse.redirect(dashboardUrl);
    }

    if (
        pathname === '/dashboard/professional' &&
        (request.cookies.get('role')?.value === 'Paciente' || request.cookies.get('role')?.value === 'Administrador')
    ) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }
    if (
        pathname === '/dashboard/user' &&
        (request.cookies.get('role')?.value === 'Psicólogo' || request.cookies.get('role')?.value === 'Administrador')
    ) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }
    if (
        pathname === '/dashboard/admin' &&
        (request.cookies.get('role')?.value === 'Psicólogo' || request.cookies.get('role')?.value === 'Paciente')
    ) {
        const homeUrl = new URL('/', origin);
        return NextResponse.redirect(homeUrl);
    }
}
