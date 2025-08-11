import { Brain, Calendar, CheckCircle, MessageCircle, Search } from "lucide-react"
import { infoCards } from "./infoCards"

const Cards_ComoFunciona = () => {
    return (
        <div className="w-[80%] flex flex-col items-center justify-center">
            {infoCards.map((paso) => (
                <div key={paso.id}>
{paso.id === 1 &&   
                <div className="grid w-full grid-cols-2 mt-20 mb-40">
                            <div className="w-[90%] m-auto h-fit border-2 bg-white border-gray-300 rounded-xl p-8">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 bg-[#4F46E5]">
                                        <span className="text-4xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-8">
                                        <h2 className="mb-2 text-lg font-bold">{paso.titulo}</h2>
                                        <span className="text-gray-500">{paso.descripcion}</span>
                                        <div className="mt-4">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-2 mb-1">
                                                    <CheckCircle className="text-violet-900 w-[18px]"/>
                                                    <span className="text-sm font-semibold">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            
                            <div className="flex items-center justify-center">
                                <div className="w-[90%] h-60 bg-[#A5B5FC] flex items-center justify-center rounded-xl">
                                    <MessageCircle className="w-20 h-40 text-[#5046E7]"/>
                                </div>
                            </div>
                    </div>
}
{paso.id === 2 &&   
                <div className="grid w-full grid-cols-2 mb-40">           
                            <div className="flex items-center justify-center">
                                <div className="w-[90%] h-60 bg-[#A5B5FC] flex items-center justify-center rounded-xl">
                                    <Brain className="w-20 h-40 text-[#5046E7]"/>
                                </div>
                            </div>

                            <div className="w-[90%] m-auto h-fit border-2 bg-white border-gray-300 rounded-xl p-8">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 bg-[#4F46E5]">
                                        <span className="text-4xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-8">
                                        <h2 className="mb-2 text-lg font-bold">{paso.titulo}</h2>
                                        <span className="text-gray-500">{paso.descripcion}</span>
                                        <div className="mt-4">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-2 mb-1">
                                                    <CheckCircle className="text-violet-900 w-[18px]"/>
                                                    <span className="text-sm font-semibold">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                    </div>
}

{paso.id === 3 &&   
                <div className="grid w-full grid-cols-2 mb-40">
                            <div className="w-[90%] m-auto h-fit border-2 bg-white border-gray-300 rounded-xl p-8">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 bg-[#4F46E5]">
                                        <span className="text-4xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-8">
                                        <h2 className="mb-2 text-lg font-bold">{paso.titulo}</h2>
                                        <span className="text-gray-500">{paso.descripcion}</span>
                                        <div className="mt-4">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-2 mb-1">
                                                    <CheckCircle className="text-violet-900 w-[18px]"/>
                                                    <span className="text-sm font-semibold">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            
                            <div className="flex items-center justify-center">
                                <div className="w-[90%] h-60 bg-[#A5B5FC] flex items-center justify-center rounded-xl">
                                    <Search className="w-20 h-40 text-[#5046E7]"/>
                                </div>
                            </div>
                    </div>
}
{paso.id === 4 &&   
                <div className="grid w-full grid-cols-2 mb-40">           
                            <div className="flex items-center justify-center">
                                <div className="w-[90%] h-60 bg-[#A5B5FC] flex items-center justify-center rounded-xl">
                                    <Calendar className="w-20 h-40 text-[#5046E7]"/>
                                </div>
                            </div>

                            <div className="w-[90%] m-auto h-fit border-2 bg-white border-gray-300 rounded-xl p-8">
                                <div>
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 bg-[#4F46E5]">
                                        <span className="text-4xl font-bold text-white">{paso.id}</span>
                                    </div>
                                    
                                    <div className="mt-8">
                                        <h2 className="mb-2 text-lg font-bold">{paso.titulo}</h2>
                                        <span className="text-gray-500">{paso.descripcion}</span>
                                        <div className="mt-4">
                                            {paso.items.map((item, index) => (
                                                <div key={index} className="flex flex-row items-center gap-2 mb-1">
                                                    <CheckCircle className="text-violet-900 w-[18px]"/>
                                                    <span className="text-sm font-semibold">{item}</span>
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