import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Header from "../components/header";

import { MetaMaskProvider } from "metamask-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaMaskProvider>
        <Header />
        <Toaster />
        <Component {...pageProps} />
      </MetaMaskProvider>
    </>
  );
}

export default MyApp;
