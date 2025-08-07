import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    value: string,
    error?: string | false;
    children?: React.ReactNode
}

const Input = ({id, label, className, name, error, value, children, ...rest}: InputProps) => {
    return(
        <div className="flex flex-col mb-3">
            <label 
                htmlFor={id}
                className="mt-2 font-bold text-black"
            >
                {label}
            </label>
            
            <div className="flex">
                <input 
                    id={id}
                    name={name}
                    value={value}
                    className="w-[90%] bg-violeta-400"
                    {...rest}
                />
                {children && (
                    <span className="flex items-center justify-center w-8 text-black cursor-pointer rounded-e-lg right-2 bg-gris-primario">
                        {children}
                    </span>
                )}
                
            </div>

            {error && <p className="mt-1 text-sm text-red-900">{error}</p>}
        </div>
    )
}

export default Input;