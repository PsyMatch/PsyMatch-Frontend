const Cards = () => {
    // Simulación de datos para usuario
    const userPanel = {
        terapeutasActivos: 3,
        turnosProximos: 2,
        valoracionMedia: 4.7,
        gastos: "$12,000"
    }
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col px-12 py-6 text-start bg-[#ffffff] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{userPanel.terapeutasActivos}</span>
                <span className="text-sm text-black">Terapeutas activos</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#ffffff] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{userPanel.turnosProximos}</span>
                <span className="text-sm text-black">Turnos próximos</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#ffffff] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{userPanel.valoracionMedia}</span>
                <span className="text-sm text-black">Valoración media</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#ffffff] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{userPanel.gastos}</span>
                <span className="text-sm text-black">Gastos del Mes</span>
            </div>
        </div>
    )
}

export default Cards
