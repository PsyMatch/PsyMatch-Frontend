import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';

//<ITurno[]>

const TurnosAdmin = () => {
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchData = async () => {
            const response = await fetch(`${envs.next_public_api_url}/appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            console.log(result);
            setTurnos(result);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Turnos</h2>
            {/* FALTA VER QUE TRAERN */}
        </div>
    );
};

export default TurnosAdmin;
