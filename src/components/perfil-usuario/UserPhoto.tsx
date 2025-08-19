import React from 'react';
import Image from 'next/image';

interface UserPhotoProps {
    photoUrl?: string;
    name: string;
}

const UserPhoto: React.FC<UserPhotoProps> = ({ photoUrl, name }) => (
    <div className="flex justify-center mt-10">
        <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-400 rounded-full overflow-hidden flex items-center justify-center relative">
            {photoUrl ? <Image src={photoUrl} alt={name} fill className="object-cover" /> : <span className="text-white text-2xl">{name[0]}</span>}
        </div>
    </div>
);

export default UserPhoto;
