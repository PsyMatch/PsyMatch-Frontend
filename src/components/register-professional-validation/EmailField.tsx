import { useRef } from 'react';
import { useField } from 'formik';
import { Mail } from 'lucide-react';
import { envs } from '@/config/envs.config';

const EmailField = () => {
  const [field, meta, helpers] = useField('email');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const validateEmail = (value: string) =>
    new Promise<string | undefined>((resolve) => {
      if (!value) return resolve('El correo es obligatorio');

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`${envs.next_public_api_url}/users/validate-unique`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ field: 'email', emailValue: value }),
          });
          if (res.status === 409) return resolve('El correo ya está registrado');
          resolve(undefined);
        } catch {
          resolve('Error de conexión');
        }
      }, 500);
    });

  return (
    <div>
      <label className="text-sm font-medium text-gray-700" htmlFor="email">
        Correo Electrónico *
      </label>
      <div className="relative">
        <Mail className="absolute w-5 h-5 text-gray-400 pointer-events-none left-3 top-1/2 transform -translate-y-1/2" />
        <input
          {...field}
          id="email"
          type="email"
          className="flex w-full h-10 px-3 py-2 pl-10 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
          onChange={(e) => {
            field.onChange(e);
            validateEmail(e.target.value).then((error) => helpers.setError(error));
          }}
          onBlur={() => helpers.setTouched(true)}
        />
      </div>
      {meta.touched && meta.error && <div className="mt-1 text-red-500">{meta.error}</div>}
    </div>
  );
};

export default EmailField
