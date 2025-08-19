import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BotonesRegisterProvider } from '@/context/botonesRegisterContext';
import { FotoDePerfilProvider } from '@/context/fotoDePerfil';
import { AuthProfessionalProvider } from '@/context/registerProfessional';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'PsyMatch',
    description: 'Plataforma de gestión de psicólogos y pacientes',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <BotonesRegisterProvider>
                    <FotoDePerfilProvider>
                        <AuthProfessionalProvider>
                            <Navbar />
                            {children}
                            <Footer />
                        </AuthProfessionalProvider>
                    </FotoDePerfilProvider>
                </BotonesRegisterProvider>
            </body>
        </html>
    );
}
