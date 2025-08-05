import Image from "next/image"
import logoCerebro from "../assets/logoCerebro.svg"
import { Brain } from 'lucide-react';

const botonesPacientes = [
    <a key={1} href="">Buscar Terapeutas</a>,
    <a key={2} href="">Cómo Funciona</a>,
    <a key={3} href="">Precios</a>,
    <a key={4} href="">Soporte</a>
]

const botonesProfecionales = [
    <a key={1} href="">Únete a Nuestra Red</a>,
    <a key={2} href="">Panel Profesional</a>,
    <a key={3} href="">Recursos</a>
]
const botonesEmpresa = [
    <a key={1} href="">Acerca de Nosotros</a>,
    <a key={2} href="">Política de Privacidad</a>,
    <a key={3} href="">Términos de Servicio</a>,
    <a key={4} href="">Contacto</a>
]

const Footer = () => {
    return (
        <div className="w-screen h-fit bg-[#111827] flex flex-col items-center py-9">
            <div className="flex flex-row justify-between w-[80%] h-fit border-b-gray-800 border-b-2 pb-3">
                <div className="w-80">
                    <div className="flex flex-row gap-2">
                        <Brain className="text-[#5046E7]"/>
                        <h3 className="text-white font-bold">PsyMatch</h3>
                    </div>
                    <div className="w-80 mt-5">
                        <span className="text-gray-400 font-medium">Conectandote con los profesionales de salud mental adecuados a través del emparejamiento</span>
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="text-white font-bold">Para Pacientes</h3>
                    <div className="w-fit mt-5">
                        {botonesPacientes.map(boton => (
                            <li key={boton.key} className="list-none mb-2 w-fit text-gray-400 font-medium">{boton}</li>
                        ))}
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="text-white font-bold">Para Profecionales</h3>
                    <div className="w-fit mt-5">
                        {botonesProfecionales.map(boton => (
                            <li key={boton.key} className="list-none mb-2 w-fit text-gray-400 font-medium">{boton}</li>
                        ))}
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="text-white font-bold">Empresa</h3>
                    <div className="w-fit mt-5">
                        {botonesEmpresa.map(boton => (
                            <li key={boton.key} className="list-none mb-2 w-fit text-gray-400 font-medium">{boton}</li>
                        ))}
                    </div>
                </div>
            </div>
            <span className="mt-6 text-gray-600 font-semibold">2025 PsyMatch. Todos los derechos reservados.</span>
        </div>
    )
}

export default Footer