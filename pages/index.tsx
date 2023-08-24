import {
  ConnectWallet,
  NFT,
  useAddress,
  useNFT,
  useNFTBalance,
  useContract,
  useWallet,
  Web3Button,
} from "@thirdweb-dev/react";

import Image from "next/image";
import { NextPage } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import accessPassImg from "@/public/images/access-pass.png";
import {
  ACCESS_PASS_ADDRESS_POLYGON,
  IMPLEMENTATION_ADDRESS_POLYGON,
} from "@/lib/constants";
import { Signer } from "ethers";
import toast from "react-hot-toast";
import { useState } from "react";
import { newSmartWallet } from "@/lib/utils/smartwallet";
import { TokenboundClient } from "@tokenbound/sdk";
import { ACTIVE_CHAIN } from "@/lib/constants";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
    null
  );
  const [signer, setSigner] = useState<Signer>();

  // get the currently connected wallet
  const address = useAddress();
  const wallet = useWallet();

  const { contract } = useContract(ACCESS_PASS_ADDRESS_POLYGON);
  const { data: nft, isLoading, error } = useNFT(contract, 0);

  const {
    data: nftBalance,
    isLoading: loadingNftBalance,
    error: nftBalanceError,
  } = useNFTBalance(contract, address, 0);
  console.log("nft balance:", nftBalance?.toNumber());

  const createSmartWallet = async (nft: NFT) => {
    if (nft && smartWalletAddress == null && address && wallet) {
      const smartWallet = newSmartWallet(nft);
      console.log("personal wallet", address);
      await smartWallet.connect({
        personalWallet: wallet,
      });
      setSigner(await smartWallet.getSigner());
      console.log("signer", signer);
      setSmartWalletAddress(await smartWallet.getAddress());
      console.log("smart wallet address", await smartWallet.getAddress());
      return smartWallet;
    } else {
      console.log("smart wallet not created");
    }
  };

  const tokenboundClient = new TokenboundClient({
    signer,
    chainId: ACTIVE_CHAIN.chainId,
    implementationAddress: IMPLEMENTATION_ADDRESS_POLYGON as `0x${string}`,
  });

  const tokenboundAccount = tokenboundClient.getAccount({
    tokenContract: ACCESS_PASS_ADDRESS_POLYGON,
    tokenId: "0",
  });

  console.log("tokenboundAccount: ", tokenboundAccount);

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
        {address && nft && nftBalance && nftBalance?.toNumber() < 1 ? (
          <Web3Button
            className="px-6 py-3 rounded-lg bg-bluePrimary text-white hover:bg-blue-500 transition-colors duration-500 animate-in fade-in-10"
            contractAddress={ACCESS_PASS_ADDRESS_POLYGON}
            action={async (contract) => {
              try {
                await contract?.erc721.claimTo(address, 1);
              } catch (err: unknown) {
                console.error("error claiming: ", err);
              }
              try {
                await createSmartWallet(nft);
              } catch (err: unknown) {
                console.error("error creating smart wallet: ", err);
              }
            }}
            onSuccess={() => {
              toast("NFT Claimed!", {
                icon: "✅",
                style: {
                  borderRadius: "4px",
                  background: "#222528",
                  color: "#fff",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                },
                position: "bottom-center",
              });
            }}
          >
            Claim Pass
          </Web3Button>
        ) : (
          <ConnectWallet className="bg-bluePrimary text-white hover:bg-blue-500 transition-colors duration-500 animate-in fade-in-10" />
        )}
      </div>
      <div>
        {smartWalletAddress && (
          <>
            <h3 className="my-6 font-medium">
              smart wallet address: {smartWalletAddress}
            </h3>
          </>
        )}
        {tokenboundAccount && (
          <p className="font-bold text-md text-white my-6">
            Tokenbound Account: {tokenboundAccount}
          </p>
        )}
      </div>
    </main>
  );
};

export default Home;
