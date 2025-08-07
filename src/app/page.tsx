import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Information from "@/components/Home/Information/Information";
import Match from "@/components/Home/Match/Match";
import Profesionales from "@/components/Home/profesionales/Profesionales";

export default function Home() {
  return (
    <>
      <Match />
      <Information />
      <Profesionales />
    </>
  );
}
