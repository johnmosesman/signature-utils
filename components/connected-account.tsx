import { Wallet } from "ethers";
import { useState } from "react";
import { prettyAddress } from "../lib/utils";
import ConnectWallet from "./connect-wallet";
import { useMetaMask } from "metamask-react";

type Props = {
  wallet?: Wallet;
  copyIcon: JSX.Element;
  copyText: Function;
};

const ConnectedAccount = ({ wallet, copyIcon, copyText }: Props) => {
  const { status } = useMetaMask();

  return (
    <div className="flex flex-col items-center lg:flex-row">
      {status !== "connected" && (
        <>
          <div
            onClick={(e) => copyText(e, wallet?.address)}
            className="lg:mr-4"
          >
            <label>Public Address</label>

            {wallet?.address && (
              <div className="flex flex-row items-center">
                <p className="text-xs mr-2">{prettyAddress(wallet.address)}</p>

                <div className="w-4 h-4">{copyIcon}</div>
              </div>
            )}
          </div>

          <div onClick={(e) => copyText(e, wallet?.privateKey)}>
            <label>Private Key</label>

            {wallet?.privateKey && (
              <div className="flex flex-row items-center">
                <p className="text-xs mr-1">
                  {prettyAddress(wallet.privateKey)}
                </p>

                <div className="w-4 h-4">{copyIcon}</div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="ml-4">
        <ConnectWallet copyIcon={copyIcon} copyText={copyText} />
      </div>
    </div>
  );
};

export default ConnectedAccount;
