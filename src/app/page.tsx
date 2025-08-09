import Information from "@/components/Home/Information/Information";
import Match from "@/components/Home/Match/Match";
import Profesionales from "@/components/Home/profesionales/Profesionales";
import Start from '@/components/Home/Start/Start';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Match />
            <Profesionales />
            <Information />
            <Start />
        </div>
    );
}
