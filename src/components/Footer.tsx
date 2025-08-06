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
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-0 justify-between w-[80%] h-fit border-b-gray-800 border-b-2 pb-3">
                <div className="w-80">
                    <div className="flex flex-row gap-2">
                        <Brain className="text-[#5046E7]"/>
                        <h3 className="font-bold text-white">PsyMatch</h3>
                    </div>
                    <div className="mt-5 w-80">
                        <span className="font-medium text-gray-400">Conectandote con los profesionales de salud mental adecuados a través del emparejamiento</span>
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="font-bold text-white">Para Pacientes</h3>
                    <div className="mt-5 w-fit">
                        {botonesPacientes.map(boton => (
                            <li key={boton.key} className="mb-2 font-medium text-gray-400 list-none w-fit">{boton}</li>
                        ))}
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="font-bold text-white">Para Profecionales</h3>
                    <div className="mt-5 w-fit">
                        {botonesProfecionales.map(boton => (
                            <li key={boton.key} className="mb-2 font-medium text-gray-400 list-none w-fit">{boton}</li>
                        ))}
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="font-bold text-white">Empresa</h3>
                    <div className="mt-5 w-fit">
                        {botonesEmpresa.map(boton => (
                            <li key={boton.key} className="mb-2 font-medium text-gray-400 list-none w-fit">{boton}</li>
                        ))}
                    </div>
                </div>
            </div>
            <span className="mt-6 text-sm font-semibold text-gray-600 lg:text-lg">2025 PsyMatch. Todos los derechos reservados.</span>
        </div>
    )
}

export default Footer