import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    value: string,
    error?: string | false;
    children?: React.ReactNode
}

const InputCheckbox = ({id, label, className, name, error, value, children, ...rest}: InputProps) => {
    return (
        <div className='flex flex-row items-center justify-start gap-2'>

            <div className="flex">
                <input 
                    id={id}
                    name={name}
                    value={value}
                    {...rest}
                />          
            </div>
            
            <label 
                htmlFor={id}
                className="text-black "
            >
               {label}
            </label>

        </div>
    )
}

export default InputCheckbox;