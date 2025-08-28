import { useRef } from 'react';
import { useField } from 'formik';
import CustomPhoneProfessionalInput from '../ui/Custom-phone-input-professional';
import { envs } from '@/config/envs.config';

const PhoneField = () => {
  const [, meta] = useField('phone');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const validatePhone = (value: string) =>
    new Promise<string | undefined>((resolve) => {
      if (!value) return resolve('El teléfono es obligatorio');

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`${envs.next_public_api_url}/users/validate-unique`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ field: 'phone', phoneValue: `+${value}` }),
          });
          if (res.status === 409) return resolve('El teléfono ya está registrado');
          resolve(undefined);
        } catch {
          resolve('Error de conexión');
        }
      }, 500);
    });

  return (
    <div>
        <CustomPhoneProfessionalInput
            label="Número de Teléfono *"
            name="phone"
            id="phone"
            placeholder="Tu número"
            validate={validatePhone}
        />
      {meta.touched && meta.error && <div className="mt-1 text-xs text-red-500">{meta.error}</div>}
    </div>
  );
};

export default PhoneField