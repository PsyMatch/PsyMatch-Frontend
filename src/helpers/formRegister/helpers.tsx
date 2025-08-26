import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const COOKIE_KEY = 'userDataCompleta';

//HELPERS

export const getCookieObject = () => {
    const cookie = Cookies.get(COOKIE_KEY);
    return cookie ? JSON.parse(cookie) : {};
};

export const saveMerged = (partial: Record<string, unknown>) => {
    //trae lo q ya estaba
    const prev = getCookieObject();
    //agrega lo nuevo
    const merged = { ...prev, ...partial };
    //guarda
    Cookies.set(COOKIE_KEY, JSON.stringify(merged));
};

//NO GUARDASMOS ESTOS DATOS
export const dataToSave = (values: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profile_picture, ...rest } = values;

    //aseguramos q sean strings
    Object.keys(rest).forEach((k) => {
        if (rest[k] === undefined || rest[k] === null) rest[k] = '';
    });

    return rest;
};

//QUE SE GUARDE AUTOMATICAMENTE

export const AutoSaveCookies = () => {
    const { values } = useFormikContext<Record<string, unknown>>();

    useEffect(() => {
        const toSave = dataToSave(values);
        const prev = getCookieObject();
        const merged = { ...prev, ...toSave };

        //solo se guarda si cambio
        if (JSON.stringify(merged) !== JSON.stringify(prev)) {
            setTimeout(() => {
                Cookies.set(COOKIE_KEY, JSON.stringify(merged));
            }, 500);

            return;
        }

        return () => {};
    }, [values]);

    return null;
};
