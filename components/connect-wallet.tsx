import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { ethers } from "ethers";
import { prettyAddress } from "../lib/utils";

type Props = {
  copyIcon: JSX.Element;
  copyText: Function;
};

const ConnectWallet = ({ copyIcon, copyText }: Props) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  useEffect(() => {
    if (status !== "connected") {
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", []).then(() => {
      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner();
      console.log("signer", signer);
    });
  }, [status, ethereum]);

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
      <button
        className="text-sm text-gray-600 border border-gray-600 rounded px-2 py-1"
        onClick={connect}
      >
        Connect MetaMask
      </button>
    );

  if (status === "connecting")
    return <div className="text-sm text-gray-600">Connecting...</div>;

  if (status === "connected") {
    return (
      <div
        onClick={(e) => copyText(e, account)}
        className="flex flex-row text-sm text-gray-600 cursor-pointer group"
      >
        <div className="flex flex-row">
          <p className="mr-1">Connected as</p>
          <p>{prettyAddress(account)}</p>
        </div>

        <div className="hidden group-hover:block w-4 h-4 ml-1">{copyIcon}</div>
      </div>
    );
  }

  return <></>;
};

export default ConnectWallet;
