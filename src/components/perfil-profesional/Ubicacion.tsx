import { MapPin } from 'lucide-react';
import type { IProfessional } from '@/services/prrofessionalProfile';

const Ubicacion = ({ data }: { data: IProfessional }) => {
    const generateMapUrl = (address: string) => {
        if (!address) return null;

        const encodedAddress = encodeURIComponent(address);
        return `https://www.google.com/maps?q=${encodedAddress}&z=15&output=embed`;
    };

    const mapUrl = generateMapUrl(data.office_address);

    if (!data.office_address) {
        return null;
    }

    return (
        <section
            className="flex flex-col w-full gap-6 p-6 mb-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm"
            aria-labelledby="location-title"
        >
            <h2 id="location-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
                Ubicación del consultorio
            </h2>

            <div className="space-y-4">

                {mapUrl && (
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                )}
            </div>
        </section>
    );
};

export default Ubicacion;
