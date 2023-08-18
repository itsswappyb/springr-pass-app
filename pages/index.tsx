import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import accessPassImgLg from "../public/images/access-pass-lg.png";
import accessPassImg from "../public/images/access-pass.png";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <main
      className={`flex min-h-screen flex-col justify-center items-center ${bricolage.className}`}
    >
      <h1 className="text-6xl font-bold my-6 animate-in fade-in-5 duration-1000">
        Springr Beta Access Pass
      </h1>
      <p className="mb-12 animate-in fade-in-5 duration-1000">
        Congratulations on being one of the few special people to get early
        access membership to Springr.
      </p>

      <div className="flex justify-center items-center h-full animate-in spin-in duration-700 transition-all ease-in delay-300 opacity-100 zoom-in-50">
        <Image src={accessPassImg} alt="Access Pass" className="max-w-xl" />
      </div>
      <div>
        <ConnectWallet className="bg-bluePrimary text-white hover:bg-blue-500 transition-colors duration-500 animate-in fade-in-10" />
      </div>
    </main>
  );
};

export default Home;
