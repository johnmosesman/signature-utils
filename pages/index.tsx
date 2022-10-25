import { ethers, Wallet } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ConnectedAccount from "../components/connected-account";
import ContractTester from "../components/contract-tester";
import SignatureDebugger from "../components/signature-debugger";
import {
  DEFAULT_DOMAIN,
  DEFAULT_MESSAGE,
  EIP712Payload,
  Message,
} from "../lib/eip712-utils";
import { usePayload } from "../lib/hooks/use-payload";
import { useSignature } from "../lib/hooks/use-signature";
import { useSigner } from "../lib/hooks/use-signer";

enum PanelType {
  SignatureDebugger = "SignatureDebugger",
  ContractTester = "ContractTester",
}

const copyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="fil-current stroke-current text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
    />
  </svg>
);

const copyText = (event: any, text: string | undefined) => {
  event.preventDefault();
  console.log("copyText", text);

  navigator.clipboard.writeText(text || "");
};

const Home: NextPage = () => {
  const [panel, setPanel] = useState<PanelType>(PanelType.SignatureDebugger);

  const [domain, setDomain] = useState<EIP712Payload["domain"]>(DEFAULT_DOMAIN);
  const [message, setMessage] = useState<Message>(DEFAULT_MESSAGE);

  const [wallet, setWallet] = useState<Wallet>();

  const signer = useSigner();
  const data = usePayload(domain, message);

  console.log("data is", data);

  const signatureResult = useSignature(data, wallet);
  console.log("signatureResult", signatureResult);

  useEffect(() => {
    setWallet(ethers.Wallet.createRandom());
  }, []);

  return (
    <main className="relative mx-auto mt-12 min-h-screen bg-white px-4 pb-12 md:px-8 lg:mt-24 lg:max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end">
        <div className="flex flex-row items-center mb-4 lg:mb-0">
          <button
            onClick={() => setPanel(PanelType.SignatureDebugger)}
            className={`px-4 py-2 rounded-tl rounded-bl bg-gray-100 text-xs uppercase ${
              panel === PanelType.SignatureDebugger
                ? "bg-gray-600 text-white"
                : ""
            }`}
          >
            Build EIP712
          </button>

          <button
            onClick={() => setPanel(PanelType.ContractTester)}
            className={`px-4 py-2 rounded-tr rounded-br bg-gray-100 text-xs uppercase ${
              panel === PanelType.ContractTester ? "bg-gray-600 text-white" : ""
            }`}
          >
            Test Contracts
          </button>
        </div>

        <ConnectedAccount
          wallet={wallet}
          copyIcon={copyIcon}
          copyText={copyText}
        />
      </div>

      <div className="border-t border-gray-300 mt-2 mb-6"></div>

      {panel === PanelType.SignatureDebugger && (
        <SignatureDebugger
          domain={domain}
          setDomain={setDomain}
          message={message}
          setMessage={setMessage}
          payload={data}
          signatureResult={signatureResult}
          copyIcon={copyIcon}
          copyText={copyText}
          signer={signer}
        />
      )}

      {panel === PanelType.ContractTester && (
        <ContractTester
          payload={data}
          signatureResult={signatureResult}
          wallet={wallet}
          copyIcon={copyIcon}
          copyText={copyText}
          setPanelToDebugger={() => {
            setPanel(PanelType.SignatureDebugger);
          }}
          message={message}
          setMessage={setMessage}
        />
      )}
    </main>
  );
};

export default Home;
