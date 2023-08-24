import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "@/styles/globals.scss";
import { ACTIVE_CHAIN } from "@/lib/constants";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const clientId: string = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider clientId={clientId} activeChain={ACTIVE_CHAIN}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
