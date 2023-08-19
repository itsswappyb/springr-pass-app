import {
  ConnectWallet,
  useAddress,
  useClaimNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import accessPassImgLg from "../public/images/access-pass-lg.png";
import accessPassImg from "../public/images/access-pass.png";
import { ACCESS_PASS_ADDRESS_GOERLI } from "../lib/constants";
import { BigNumber } from "ethers";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const Home: NextPage = () => {
  const address = useAddress();
  // const { contract } = useContract(ACCESS_PASS_ADDRESS_GOERLI);
  // const { mutate: claimNFT, isLoading, error } = useClaimNFT(contract);

  // if (error) {
  //   console.error("failed to claim nft", error);
  // }

  console.log("address is string:", typeof address === "string");

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
        {address ? (
          <Web3Button
            className="px-6 py-3 rounded-lg bg-bluePrimary text-white hover:bg-blue-500 transition-colors duration-500 animate-in fade-in-10"
            // disabled={isLoading}
            contractAddress={ACCESS_PASS_ADDRESS_GOERLI}
            // action={async (contract) =>
            //   // claimNFT({
            //   //   to: "0x9c013d02422eC31951189d406Ca223FD01939985",
            //   //   quantity: 1,
            //   // })
            //   contract?.erc1155.claimTo(address, 0, 1)
            // }
            action={async (contract) => await contract?.erc1155.claim(0, 1)}
            onSuccess={() => {
              // toast("NFT Claimed!", {
              //   icon: "✅",
              //   style: toastStyle,
              //   position: "bottom-center",
              // });
              alert("NFT Claimed!");
            }}
          >
            Claim Pass
          </Web3Button>
        ) : (
          <ConnectWallet className="bg-bluePrimary text-white hover:bg-blue-500 transition-colors duration-500 animate-in fade-in-10" />
        )}
      </div>
    </main>
  );
};

export default Home;
