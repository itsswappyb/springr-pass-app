import { Goerli } from "@thirdweb-dev/chains";
import { type TBAccountParams } from "@tokenbound/sdk/dist/src/TokenboundClient";

export const DEFAULT_ACCOUNT: TBAccountParams = {
  tokenContract: "0xe7134a029cd2fd55f678d6809e64d0b6a0caddcb",
  tokenId: "9",
};

export const ACCESS_PASS_ADDRESS_SEPOLIA =
  "0xec5d6C45AdC0d1ca7A4b04338c76E942517Fdc10";
export const ACCESS_PASS_ADDRESS_SCROLL =
  "0xfc29c0118c79d657885Ef7802dD595475bfA169f";
export const ACCESS_PASS_ADDRESS_GOERLI =
  "0x321940edED4AF0Cc35a593cb9c1675Fd63c7A7cf";
export const ACTIVE_CHAIN = Goerli;

export const FACTORY_ADDRESS_GOERLI =
  "0x02101dfB77FDE026414827Fdc604ddAF224F0921";

export const IMPLEMENTATION_ADDRESS_GOERLI =
  "0xd5c3EAA2fA812c3a45a773d4962557765B6E0ecD";
