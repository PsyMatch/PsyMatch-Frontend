import RegisterForm from "./RegisterForm"

const RegisterContainer = () => {
    return(
        <div className="w-screen lg:w-[50%] bg-[#CECECE] flex flex-col pb-20">
            <div className="m-auto">
                <h1 className="text-[30px] my-5 font-bold text-[#5046E7]">Únete a nuestra red profesional</h1>
                <div className="text-end">
                    <div className="w-full h-2 mb-2 bg-white rounded-xl">
                        <div className="w-full h-2 bg-black rounded-xl"></div>
                    </div>
                    <span className="text-gray-500">Paso 3 de 3</span>
                </div>
            </div>

            <div className="mt-6 mb-6 ml-5">
                <h2 className="text-[#5046E7] text-[20px] font-bold">Servicios y Especialidades</h2>
                <h4 className="font-medium text-gray-700">¿Qué servicios ofreces y cuáles son tus áreas de especialización?</h4>
            </div>
            
            <RegisterForm />

        </div>
    )
}

export default RegisterContainer