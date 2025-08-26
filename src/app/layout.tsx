import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlowbiteInit from '@/components/FlowbiteInit';
import { BotonesRegisterProvider } from '@/context/botonesRegisterContext';
import { FotoDePerfilProvider } from '@/context/fotoDePerfil';
import { AuthProfessionalProvider } from '@/context/registerProfessional';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvider } from '@/context/modalContraseña';


const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'PsyMatch - Conectando mentes',
    description: 'Plataforma para conectar pacientes con profesionales de salud mental',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <FlowbiteInit />
                <BotonesRegisterProvider>
                    <ModalProvider>
                    <FotoDePerfilProvider>
                        <AuthProfessionalProvider>
                            <Navbar />
                            {children}
                            <Footer />
                            <ToastContainer
                                position="top-right"
                                autoClose={false}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                                closeButton={true}
                            />
                        </AuthProfessionalProvider>
                    </FotoDePerfilProvider>
                    </ModalProvider>
                </BotonesRegisterProvider>             
            </body>
        </html>
    );
}
