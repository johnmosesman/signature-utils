import type { NextPage } from "next";
import { useState } from "react";
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
  // const [panel, setPanel] = useState<PanelType>(PanelType.SignatureDebugger);

  const [domain, setDomain] = useState<EIP712Payload["domain"]>(DEFAULT_DOMAIN);
  const [message, setMessage] = useState<Message>(DEFAULT_MESSAGE);

  return (
    <main className="relative mx-auto mt-12 min-h-screen bg-white px-4 pb-12 md:px-8 lg:mt-24 lg:max-w-7xl ">
      <SignatureDebugger
        domain={domain}
        setDomain={setDomain}
        message={message}
        setMessage={setMessage}
      />
    </main>
  );
};

export default Home;
