import { NextPage } from "next";

import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { ethers } from "ethers";

const prettyAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Test: NextPage = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  useEffect(() => {
    if (status !== "connected") {
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", []).then(() => {
      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner();
      console.log("signer", signer);
    });
  }, [status]);

  if (status === "initializing") return <div></div>;

  if (status === "unavailable")
    return (
      <div className="text-sm text-gray-600">
        Install{" "}
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          MetaMask
        </a>{" "}
        to connect a wallet
      </div>
    );

  if (status === "notConnected")
    return (
      <button className="text-sm text-gray-600 underline" onClick={connect}>
        Connect MetaMask
      </button>
    );

  if (status === "connecting")
    return <div className="text-sm text-gray-600">Connecting...</div>;

  if (status === "connected") {
    return <div>{prettyAddress(account)}</div>;
  }

  return (
    <div>
      <p>hi</p>
    </div>
  );
};

export default Test;
