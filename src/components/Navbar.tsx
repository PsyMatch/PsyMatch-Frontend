import Image from "next/image"
import logoCabeza from "../assets/logoCabeza.svg"
import { Key } from "lucide-react"

const botonesNavBarHome = [
        <a href="">Buscar Terapeutas</a>,
        <a href="">Como Funciona</a>,
        <a href="">Iniciar Sesión</a>,
        <a href="" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Comenzar</a>
]
const botonesNavBarHomeLogeado = [
        <a href="">Buscar Terapeutas</a>,
        <a href="">Como Funciona</a>,
        <a href="">Perfil</a>,
]

const Navbar = () => {
    const isAuth = false
    return (
        <div className="flex flex-row items-center justify-between w-screen h-20 bg-[#CDCDCD] px-36">
            <a href="" className="flex flex-row items-center gap-2 cursor-pointer">
                <Image src={logoCabeza} alt="logo"/>
                <h3 className="text-xl font-bold text-black">PsyMatch</h3>
            </a>
            {isAuth ? <ul className="flex flex-row gap-10">
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
        </div>
    )
}

export default Navbar