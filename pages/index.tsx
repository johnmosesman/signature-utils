import type { NextPage } from "next";
import { useState } from "react";
import ContractTester from "../components/contract-tester";
import SignatureDebugger from "../components/signature-debugger";
import {
  DEFAULT_DOMAIN,
  DEFAULT_MESSAGE,
  EIP712Payload,
  Message,
} from "../lib/eip712-utils";

enum PanelType {
  SignatureDebugger = "SignatureDebugger",
  ContractTester = "ContractTester",
}

const Home: NextPage = () => {
  const [panel, setPanel] = useState<PanelType>(PanelType.SignatureDebugger);

  const [domain, setDomain] = useState<EIP712Payload["domain"]>(DEFAULT_DOMAIN);
  const [message, setMessage] = useState<Message>(DEFAULT_MESSAGE);

  return (
    <main className="relative mx-auto mt-12 min-h-screen bg-white px-4 pb-12 md:px-8 lg:mt-24 lg:max-w-7xl ">
      <div>
        <button
          onClick={() => setPanel(PanelType.SignatureDebugger)}
          className={`px-4 py-2 rounded-tl rounded-bl bg-gray-100 text-sm uppercase ${
            panel === PanelType.SignatureDebugger
              ? "bg-gray-600 text-white"
              : ""
          }`}
        >
          Signature Debugger
        </button>

        <button
          onClick={() => setPanel(PanelType.ContractTester)}
          className={`px-4 py-2 rounded-tr rounded-br bg-gray-100 text-sm uppercase ${
            panel === PanelType.ContractTester ? "bg-gray-600 text-white" : ""
          }`}
        >
          Contracts Tester
        </button>

        <div className="border-t border-gray-300 my-4"></div>
      </div>

      {panel === PanelType.SignatureDebugger && (
        <SignatureDebugger
          domain={domain}
          setDomain={setDomain}
          message={message}
          setMessage={setMessage}
        />
      )}

      {panel === PanelType.ContractTester && <ContractTester />}
    </main>
  );
};

export default Home;
