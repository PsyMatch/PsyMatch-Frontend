'use client';
import Image from 'next/image';
import logoCabeza from '../assets/logoCabeza.svg';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const botonesNavBarHome = [
    <Link key={0} href="/search-professionals">
        Buscar Terapeutas
    </Link>,
    <Link key={1} href="/como-funciona">
        Como Funciona
    </Link>,
    <Link key={2} href="/login">
        Iniciar Sesión
    </Link>,
    <Link key={3} href="/register-user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">
        Comenzar
    </Link>,
];

const botonesNavBarHomeLogeado = [
    <Link key={0} href="/search-professionals">
        Buscar Terapeutas
    </Link>,
    <a key={1} href="#como-funciona">
        Como Funciona
    </a>,
    <Link key={2} href="/dashboard/user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">
        Perfil
    </Link>,
];

const botonesNavBarMatch = [
    <Link key={0} href="/como-funciona">
        Como funciona
    </Link>,
    <Link key={1} href="/dashboard/user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">
        Perfil
    </Link>,
];

const Navbar = () => {
    const isAuth = false;
    const [menu, setMenu] = useState(false);

    const pathname = usePathname();
    const id = pathname?.split('/')[2] || '';

    return (
        <div className="flex flex-row items-center justify-between w-[100%] px-6 h-20 bg-[#ffffff] md:px-36">
            <Link href="/" className="flex flex-row items-center gap-2 cursor-pointer">
                <Image src={logoCabeza} alt="logo" />
                <h3 className="text-xl font-bold text-black">PsyMatch</h3>
            </Link>

            <div className="md:hidden lg:hidden">
                <Menu onClick={() => setMenu((prev) => !prev)} />
                {menu == true && pathname === '/' && (
                    <>
                        {!isAuth ? (
                            <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 md:flex-row md:static bg-[#CDCDCD] md:bg-transparent">
                                {botonesNavBarHome.map((boton, index) => (
                                    <li key={index} className="text-sm list-none hover:text-gray-700">
                                        {boton}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 md:flex-row md:static bg-[#CDCDCD] md:bg-transparent">
                                {botonesNavBarHomeLogeado.map((boton, index) => (
                                    <li key={index} className="text-sm list-none hover:text-gray-700">
                                        {boton}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
                {menu == true && pathname === '/search-professionals' && (
                    <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 md:flex-row md:static bg-[#CDCDCD] md:bg-transparent">
                        {botonesNavBarMatch.map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                        ))}
                    </ul>
                )}
                {menu == true &&
                    (pathname === '/dashboard/professional' || pathname === `/professionalProfile/${id}` || pathname === '/dashboard/user') && (
                        <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 md:flex-row md:static bg-[#CDCDCD] md:bg-transparent">
                            <li className="text-sm list-none hover:text-gray-700">
                                <Link href="/">
                                    <button className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Cerrar Sesión</button>
                                </Link>
                            </li>
                        </ul>
                    )}
            </div>

            {pathname === '/' && (
                <div className="hidden lg:block">
                    {!isAuth ? (
                        <ul className="flex flex-row items-center gap-4 p-3 top-20 right-1">
                            {botonesNavBarHome.map((boton, index) => (
                                <li key={index} className="text-sm list-none hover:text-gray-700">
                                    {boton}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="flex flex-row gap-10">
                            {botonesNavBarHomeLogeado.map((boton, index) => (
                                <li key={index} className="text-sm list-none hover:text-gray-700">
                                    {boton}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {pathname === '/search-professionals' && (
                <div className="hidden lg:block">
                    <ul className="flex flex-row items-center gap-4 p-3 top-20 right-1">
                        {botonesNavBarMatch.map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {(pathname === '/dashboard/professional' || pathname === `/professionalProfile/${id}` || pathname === '/dashboard/user') && (
                <div className="hidden lg:block">
                    <Link href="/">
                        <button className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Cerrar Sesión</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
