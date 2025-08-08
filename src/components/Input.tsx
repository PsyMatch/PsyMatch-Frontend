import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    error?: string | false;
    children?: React.ReactNode;
}

const Input = ({ id, label, className, name, error, value, children, ...rest }: InputProps) => {
    return (
        <div className="flex flex-col mb-3">
            <label
                htmlFor={id}
                className="text-sm mb-2 font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>

            <div className="flex">
                <input
                    id={id}
                    name={name}
                    value={value}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
    );
};

export default Input;
