import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface UserPhotoProps {
    photoUrl?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const UserPhoto = ({ photoUrl, name, size = 'lg' }: UserPhotoProps) => {
    const getInitials = (fullName: string) => {
        return fullName
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const sizeClasses = {
        sm: 'size-8',
        md: 'size-12',
        lg: 'size-20',
        xl: 'size-32',
    };

    const textSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg',
        xl: 'text-2xl',
    };

    return (
        <div className="relative group">
            <Avatar
                className={`${sizeClasses[size]} border-4 border-gray-100 group-hover:border-blue-200 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
            >
                <AvatarImage src={photoUrl || '/placeholder.svg'} alt={`Foto de perfil de ${name}`} className="object-cover" />
                <AvatarFallback className={`bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-semibold ${textSizeClasses[size]}`}>
                    {photoUrl ? (
                        getInitials(name)
                    ) : (
                        <User
                            className={`${
                                size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'
                            } text-blue-600`}
                        />
                    )}
                </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    );
};

export default UserPhoto;
