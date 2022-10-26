import { useEffect, useState } from "react";
import { ethers, Wallet } from "ethers";
import { useMetaMask } from "metamask-react";
import type { JsonRpcSigner } from "@ethersproject/providers";

export const useSigner = () => {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const { status } = useMetaMask();

  useEffect(() => {
    if (status === "connected") {
      console.log("MetaMask connected");

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log("provider", provider);

      // MetaMask requires requesting permission to connect users accounts
      provider.send("eth_requestAccounts", []).then(() => {
        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner();

        console.log("signer", signer);

        setSigner(signer);
      });
    } else {
      setSigner(undefined);
    }
  }, [status]);

  return signer;
};
