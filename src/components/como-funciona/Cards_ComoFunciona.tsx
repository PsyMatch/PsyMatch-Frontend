import { Calendar, CheckCircle, MessageCircle, Search } from "lucide-react"
import { infoCards } from "./infoCards"

const Cards_ComoFunciona = () => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            {infoCards.map((paso) => (
                <div key={paso.id}>
{paso.id === 1 &&   
                <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-12 lg:mt-20 mb-20 lg:mb-40">
                            <div className="w-full lg:w-[90%] mx-auto h-fit border-2 bg-gradient-to-br from-white to-blue-50 border-blue-200 rounded-xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 lg:h-16 lg:w-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                                        <span className="text-2xl lg:text-3xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-6 lg:mt-8">
                                        <h2 className="mb-3 text-lg lg:text-xl font-bold text-gray-800">{paso.titulo}</h2>
                                        <span className="text-gray-600 text-sm lg:text-base leading-relaxed">{paso.descripcion}</span>
                                        <div className="mt-6">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-3 mb-3 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                                                    <CheckCircle className="text-blue-600 w-5 lg:w-6 flex-shrink-0"/>
                                                    <span className="text-sm lg:text-base font-medium text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            
                            <div className="flex items-center justify-center order-first lg:order-last">
                                <div className="w-full lg:w-[90%] h-52 lg:h-64 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <MessageCircle className="w-20 h-20 lg:w-24 lg:h-24 text-white drop-shadow-lg"/>
                                </div>
                            </div>
                    </div>
}
{paso.id === 2 &&   
                <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20 lg:mb-40">           
                            <div className="flex items-center justify-center">
                                <div className="w-full lg:w-[90%] h-52 lg:h-64 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <Search className="w-20 h-20 lg:w-24 lg:h-24 text-white drop-shadow-lg"/>
                                </div>
                            </div>

                            <div className="w-full lg:w-[90%] mx-auto h-fit border-2 bg-gradient-to-br from-white to-indigo-50 border-indigo-200 rounded-xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 lg:h-16 lg:w-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                                        <span className="text-2xl lg:text-3xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-6 lg:mt-8">
                                        <h2 className="mb-3 text-lg lg:text-xl font-bold text-gray-800">{paso.titulo}</h2>
                                        <span className="text-gray-600 text-sm lg:text-base leading-relaxed">{paso.descripcion}</span>
                                        <div className="mt-6">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-3 mb-3 p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                                                    <CheckCircle className="text-blue-600 w-5 lg:w-6 flex-shrink-0"/>
                                                    <span className="text-sm lg:text-base font-medium text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                    </div>
}

{paso.id === 3 &&   
                <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20 lg:mb-40">
                            <div className="w-full lg:w-[90%] mx-auto h-fit border-2 bg-gradient-to-br from-white to-green-50 border-green-200 rounded-xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 lg:h-16 lg:w-16 bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                                        <span className="text-2xl lg:text-3xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-6 lg:mt-8">
                                        <h2 className="mb-3 text-lg lg:text-xl font-bold text-gray-800">{paso.titulo}</h2>
                                        <span className="text-gray-600 text-sm lg:text-base leading-relaxed">{paso.descripcion}</span>
                                        <div className="mt-6">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-3 mb-3 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                                                    <CheckCircle className="text-green-600 w-5 lg:w-6 flex-shrink-0"/>
                                                    <span className="text-sm lg:text-base font-medium text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            
                            <div className="flex items-center justify-center order-first lg:order-last">
                                <div className="w-full lg:w-[90%] h-52 lg:h-64 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <Calendar className="w-20 h-20 lg:w-24 lg:h-24 text-white drop-shadow-lg"/>
                                </div>
                            </div>
                    </div>
}
{paso.id === 4 &&   
                <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20 lg:mb-40">           
                            <div className="flex items-center justify-center">
                                <div className="w-full lg:w-[90%] h-52 lg:h-64 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <CheckCircle className="w-20 h-20 lg:w-24 lg:h-24 text-white drop-shadow-lg"/>
                                </div>
                            </div>

                            <div className="w-full lg:w-[90%] mx-auto h-fit border-2 bg-gradient-to-br from-white to-orange-50 border-orange-200 rounded-xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 lg:h-16 lg:w-16 bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
                                        <span className="text-2xl lg:text-3xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-6 lg:mt-8">
                                        <h2 className="mb-3 text-lg lg:text-xl font-bold text-gray-800">{paso.titulo}</h2>
                                        <span className="text-gray-600 text-sm lg:text-base leading-relaxed">{paso.descripcion}</span>
                                        <div className="mt-6">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-3 mb-3 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                                                    <CheckCircle className="text-orange-600 w-5 lg:w-6 flex-shrink-0"/>
                                                    <span className="text-sm lg:text-base font-medium text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                    </div>
}
                </div>
            ))}
        </div>
    )
}

export default Cards_ComoFunciona