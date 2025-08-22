const ReseñasAdmin = () => {
    // const [reseñas, setReseñas] = useState([]);
    
    //TIENEN QUE HACER UNA RUTA PARA TRAER TODAS LAS RESEÑAS

    // useEffect(() => {
    //     const token = Cookies.get("auth_token");
    //     const fetchData = async () => {
    //         const response = await fetch("", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         const result = await response.json();
    //         setReseñas(result);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#5046E7] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⭐</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Reseñas</h2>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-8 text-center w-full max-w-2xl">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700">Módulo en Desarrollo</h3>
                        <p className="text-gray-500 max-w-md">
                            Esta sección mostrará todas las reseñas de los pacientes sobre sus experiencias con los psicólogos.
                        </p>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 w-full max-w-md">
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Próximas funcionalidades:</strong>
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1 text-left">
                                <li>• Ver todas las reseñas</li>
                                <li>• Filtrar por calificación</li>
                                <li>• Moderar contenido</li>
                                <li>• Generar reportes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Cuando se implemente la API: */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reseñas.map((reseña) => (
                    <div key={reseña.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium text-gray-700">{reseña.userName}</span>
                                    <div className="flex text-yellow-400">
                                        {Array.from({length: reseña.rating}).map((_, i) => (
                                            <span key={i}>⭐</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">{reseña.text}</p>
                                <p className="text-xs text-gray-400 mt-2">{reseña.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default ReseñasAdmin;
