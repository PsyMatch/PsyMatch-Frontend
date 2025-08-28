import { useRef } from 'react';
import { useField } from 'formik';
import { envs } from '@/config/envs.config';

const DniField = () => {
  const [field, meta, helpers] = useField('dni');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

   const validateDni = (value: string) =>
    new Promise<string | undefined>((resolve) => {
      if (!value) return resolve('El DNI es obligatorio');

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`${envs.next_public_api_url}/users/validate-unique`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ field: 'dni', dniValue: value }),
          });
          if (res.status === 409) return resolve('El DNI ya está registrado');
          resolve(undefined);
        } catch {
          resolve('Error de conexión');
        }
      }, 500);
    });

  return (
    <div>
      <label className="text-sm font-medium text-gray-700" htmlFor="dni">
        Nro de Documento *
      </label>
<input
  {...field}
  type="number"
  id="dni"
  className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
  onChange={(e) => {
    field.onChange(e);
    validateDni(e.target.value).then((error) => helpers.setError(error));
  }}
  onBlur={(e) => {
    field.onBlur(e); // mantiene el comportamiento normal de Formik
    validateDni(field.value).then((error) => helpers.setError(error));
  }}
/>
      {meta.touched && meta.error && <div className="mt-1 text-xs text-red-500">{meta.error}</div>}
    </div>
  );
};

export default DniField