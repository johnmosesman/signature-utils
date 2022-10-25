import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header";

import { MetaMaskProvider } from "metamask-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaMaskProvider>
        <Header />
        <Component {...pageProps} />
      </MetaMaskProvider>
    </>
  );
}

export default MyApp;
