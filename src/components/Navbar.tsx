"use client"
import Image from "next/image"
import logoCabeza from "../assets/logoCabeza.svg"
import {Menu} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const botonesNavBarHome = [
        <a href="/search-professionals">Buscar Terapeutas</a>,
        <a href="">Como Funciona</a>,
        <Link href="/login">Iniciar Sesión</Link>,
        <Link href="/register-user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Comenzar</Link>
]
const botonesNavBarHomeLogeado = [
        <a href="">Buscar Terapeutas</a>,
        <a href="">Como Funciona</a>,
        <a href="">Perfil</a>,
]

const botonesNavBarMatch = [
    <a href="">Como funciona</a>,
    <a href="" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Perfil</a>
]

const Navbar = () => {
    const isAuth = true
    const [menu, setMenu] = useState(false)

    const pathname = usePathname()
    const id = pathname.split("/")[2];
    
    return (
        <div className="flex flex-row items-center justify-between w-[100%] px-6 h-20 bg-[#ffffff] md:px-36">
            <a href="/" className="flex flex-row items-center gap-2 cursor-pointer">
                <Image src={logoCabeza} alt="logo"/>
                <h3 className="text-xl font-bold text-black">PsyMatch</h3>
            </a>

            {pathname === "/" &&
            <div className="md:hidden">
                <Menu onClick={() => setMenu(prev => !prev)} />
                {menu == true &&   
                <>
                    {isAuth ? 
                        <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 md:flex-row md:static bg-[#CDCDCD] md:bg-transparent">
                            {botonesNavBarHome.map((boton, index)=> (
                                <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                            ))}
                        </ul>
                        :
                        <ul className="flex flex-row gap-10">
                            {botonesNavBarHomeLogeado.map((boton, index)=> (
                                <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                            ))}
                        </ul>
                    }
                </>
                }
            </div> }

            {pathname === "/" && 
            <div className="hidden lg:block">
                {isAuth ? 
                    <ul className="flex flex-row items-center gap-4 p-3 top-20 right-1">
                        {botonesNavBarHome.map((boton, index)=> (
                            <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                        ))}
                    </ul>
                    :
                    <ul className="flex flex-row gap-10">
                        {botonesNavBarHomeLogeado.map((boton, index)=> (
                            <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                        ))}
                    </ul>
                }
            </div> }

            {pathname === "/search-professionals" && 
            <div className="hidden lg:block">
                    <ul className="flex flex-row items-center gap-4 p-3 top-20 right-1">
                        {botonesNavBarMatch.map((boton, index)=> (
                            <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                        ))}
                    </ul>
            </div> }

            {(pathname === "/dashboard/professional" || pathname === `/professionalProfile/${id}`) && 
                <div className="hidden lg:block">
                    <button className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">
                        Cerrar Sesión
                    </button>
                </div>
            }
        </div>
    )
}

export default Navbar