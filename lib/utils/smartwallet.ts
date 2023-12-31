import { ethers } from "ethers";
import { SmartWallet } from "@thirdweb-dev/wallets";
import {
  FACTORY_ADDRESS_GOERLI,
  ACTIVE_CHAIN,
  ACCESS_PASS_ADDRESS_MUMBAI,
  IMPLEMENTATION_ADDRESS_MUMBAI,
} from "../constants";
import { SmartContract, NFT } from "@thirdweb-dev/sdk";
import { WalletOptions } from "@thirdweb-dev/wallets";
import type { SmartWalletConfig } from "@thirdweb-dev/wallets";
import type { BaseContract } from "ethers";

export function newSmartWallet(token: NFT) {
  //Smart Wallet config object
  const config: WalletOptions<SmartWalletConfig> = {
    chain: ACTIVE_CHAIN.chainId, // the chain where your smart wallet will be or is deployed
    factoryAddress: FACTORY_ADDRESS_GOERLI, // your own deployed account factory address
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID, // obtained from the thirdweb dashboard
    gasless: true, // enable or disable gasless transactions
    factoryInfo: {
      // the factory method to call to create a new account
      createAccount: async (
        factory: SmartContract<BaseContract>,
        owner: string
      ) => {
        const account = factory.prepare("createAccount", [
          IMPLEMENTATION_ADDRESS_MUMBAI,
          ACTIVE_CHAIN.chainId,
          ACCESS_PASS_ADDRESS_MUMBAI,
          token.metadata.id,
          0,
          ethers.utils.toUtf8Bytes(""),
        ]);
        console.log("here", account);
        return account;
      },
      // the factory method to call to get the account address
      getAccountAddress: async (
        factory: SmartContract<BaseContract>,
        owner: string
      ) => {
        return factory.call("account", [
          IMPLEMENTATION_ADDRESS_MUMBAI,
          ACTIVE_CHAIN.chainId,
          ACCESS_PASS_ADDRESS_MUMBAI,
          token.metadata.id,
          0,
        ]);
      },
    },
  };
  return new SmartWallet(config);
}
