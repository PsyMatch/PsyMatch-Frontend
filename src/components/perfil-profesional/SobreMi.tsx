import { IProfessional } from '@/services/prrofessionalProfile';

const SobreMi = ({ data }: { data: IProfessional }) => {
    return (
        <div className="flex flex-col w-full gap-4 p-8 mb-8 bg-white border-2 border-gray-200 h-fit rounded-xl">
            <h3 className="text-xl font-bold text-black">Sobre {data.name}</h3>
            <p className="flex flex-wrap">{data.personal_biography}</p>
        </div>
    );
};

export default SobreMi;
