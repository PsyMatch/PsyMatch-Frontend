const ReseñasAdmin = () => {
    // const [reseñas, setReseñas] = useState([]);
    //TIENEN QUE HACER UNA RUTA PARA TRAER TODAS LAS RESEÑAS

    // useEffect(() => {
    //     const token = Cookies.get("auth_token");
    //     const fetchData = async () => {
    //         const response = await fetch("", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         const result = await response.json();
    //         setReseñas(result);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div>
            <h2>Reseñas</h2>
            {/* <ul>
                {reseñas.map((reseña) => (
                    <li key={reseña.id}>{reseña.text}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default ReseñasAdmin;
