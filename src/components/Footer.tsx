import { Brain } from 'lucide-react';
import Link from 'next/link';

const botonesPacientes = [
    <Link key={1} href="/search-professionals" className="hover:text-blue-400 transition-colors">
        Buscar Terapeutas
    </Link>,
    <Link key={2} href="/how-does-it-work" className="hover:text-blue-400 transition-colors">
        Cómo Funciona
    </Link>,
    <Link key={4} href="/soporte" className="hover:text-blue-400 transition-colors">
        Soporte
    </Link>,
];

const botonesEmpresa = [
    <Link key={1} href="/about" className="hover:text-blue-400 transition-colors">
        Acerca de Nosotros
    </Link>,
    <Link key={2} href="/privacy-policy" className="hover:text-blue-400 transition-colors">
        Política de Privacidad
    </Link>,
    <Link key={3} href="/terms-of-service" className="hover:text-blue-400 transition-colors">
        Términos de Servicio
    </Link>,
    <Link key={4} href="/soporte" className="hover:text-blue-400 transition-colors">
        Contacto
    </Link>,
];

const Footer = () => {
    return (
        <div className="w-[100%] h-fit bg-[#111827] flex flex-col items-center py-9">
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-20 justify-start w-[80%] h-fit border-b-gray-800 border-b-2 pb-3">
                <div className="w-80">
                    <div className="flex flex-row gap-2">
                        <Brain className="text-[#5046E7]" />
                        <h3 className="font-bold text-white">PsyMatch</h3>
                    </div>
                    <div className="mt-5 w-80">
                        <span className="font-medium text-gray-400">
                            Conectandote con los profesionales de salud mental adecuados a través del emparejamiento
                        </span>
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="font-bold text-white">Para Pacientes</h3>
                    <div className="mt-5 w-fit">
                        {botonesPacientes.map((boton) => (
                            <li key={boton.key} className="mb-2 font-medium text-gray-400 list-none w-fit">
                                {boton}
                            </li>
                        ))}
                    </div>
                </div>

                <div className="w-40">
                    <h3 className="font-bold text-white">Empresa</h3>
                    <div className="mt-5 w-fit">
                        {botonesEmpresa.map((boton) => (
                            <li key={boton.key} className="mb-2 font-medium text-gray-400 list-none w-fit">
                                {boton}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
            <span className="mt-6 text-sm font-semibold text-gray-600 lg:text-lg">2025 PsyMatch. Todos los derechos reservados.</span>
        </div>
    );
};

export default Footer;
