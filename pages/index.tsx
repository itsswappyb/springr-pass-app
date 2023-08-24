import {
  ConnectWallet,
  NFT,
  useAddress,
  useNFT,
  useOwnedNFTs,
  useNFTBalance,
  useContract,
  useWallet,
  Web3Button,
  useSigner,
} from "@thirdweb-dev/react";

import Image from "next/image";
import { NextPage } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import accessPassImg from "@/public/images/access-pass.png";
import {
  ACCESS_PASS_ADDRESS_POLYGON,
  ACCESS_PASS_ADDRESS_MUMBAI,
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
  // const [signer, setSigner] = useState<Signer>();
  const signer = useSigner();

  // get the currently connected wallet
  const address = useAddress();
  const wallet = useWallet();

  const { contract } = useContract(ACCESS_PASS_ADDRESS_POLYGON);

  const {
    data: ownedNfts,
    isLoading: isLoadingOwnedNfts,
    error: ownedNftsError,
  } = useOwnedNFTs(contract, address);
  console.log("owned nfts:", ownedNfts);

  const tokenId = ownedNfts?.[0]?.metadata.id || "";

  const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  const tokenboundClient = new TokenboundClient({
    signer,
    chainId: ACTIVE_CHAIN.chainId,
    implementationAddress: IMPLEMENTATION_ADDRESS_POLYGON as `0x${string}`,
  });

  const createSmartWallet = async (nft: NFT) => {
    if (nft && smartWalletAddress == null && address && wallet) {
      // const smartWallet = newSmartWallet(nft);
      const tokenboundAccount = await tokenboundClient.createAccount({
        tokenContract: ACCESS_PASS_ADDRESS_POLYGON,
        tokenId: tokenId,
      });

      console.log("personal wallet", address);
      console.log("created tba:", tokenboundAccount);
      // await smartWallet.connect({
      //   personalWallet: wallet,
      // });
      // setSigner(await smartWallet.getSigner());
      // console.log("signer", signer);
      // setSmartWalletAddress(await smartWallet.getAddress());
      // console.log("smart wallet address", await smartWallet.getAddress());
      // return smartWallet;
      return tokenboundAccount;
    } else {
      console.log("smart wallet not created");
    }
  };

  function getTokenboundAccount(): string {
    let tokenboundAccount = "";
    if (tokenId) {
      tokenboundAccount = tokenboundClient.getAccount({
        tokenContract: ACCESS_PASS_ADDRESS_POLYGON,
        tokenId: tokenId,
      });
    }

    return tokenboundAccount;
  }

  return (
    <main
      className={`flex min-h-screen flex-col justify-center items-center ${bricolage.className}`}
    >
      <h1 className="text-3xl lg:text-6xl font-bold my-6 animate-in fade-in-5 duration-1000">
        Springr Beta Access Pass
      </h1>
      <p className="mb-12 animate-in fade-in-5 duration-1000 text-center px-12">
        Congratulations on being one of the few special people to get early
        access membership to Springr.
      </p>

      <div className="px-12 flex justify-center items-center h-full animate-in spin-in duration-700 transition-all ease-in delay-300 opacity-100 zoom-in-50">
        <Image
          src={accessPassImg}
          alt="Access Pass"
          className="w-full max-w-lg md:w-screen md:max-w-xl"
          priority
          quality={85}
        />
      </div>
      <div>
        {address && ownedNfts && nft && ownedNfts.length < 1 ? (
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
        {tokenId && (
          <p className="font-bold text-md text-white my-6">
            Tokenbound Account: {getTokenboundAccount()}
          </p>
        )}
      </div>
    </main>
  );
};

export default Home;
