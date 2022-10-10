import type { NextPage } from "next";
import { constants } from "ethers";
import { hexlify, hexZeroPad } from "ethers/lib/utils";
import { useState } from "react";
import DomainSeparatorBuilder from "../components/domain-separator-builder";
import MessageBuilder from "../components/message-builder";
import PayloadPreview from "../components/payload-preview";
import SignaturePreview from "../components/signature-preview";
import { EIP712Payload } from "../lib/eip712-utils";
import { usePayload } from "../lib/hooks/use-payload";
import { useSignature } from "../lib/hooks/use-signature";

const copyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="fil-current h-6 w-6 stroke-current text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
    />
  </svg>
);

const chainId = 137; // Polygon mainnet

const defaultDomain: EIP712Payload["domain"] = {
  name: "MyApp",
  version: "1.0.0",
  chainId: chainId,
  verifyingContract: "0xabcabcabcabcabcabcabcabcabcabcabcabcabca",
  salt: hexZeroPad(hexlify(chainId), 32),
};

const defaultMessage: Message = {
  primaryType: "MetaTx",
  payload: [
    {
      name: "from",
      value: constants.AddressZero,
      type: "address",
    },
    {
      name: "to",
      value: constants.AddressZero,
      type: "address",
    },
    {
      name: "value",
      value: (1e18).toString(),
      type: "uint256",
    },
  ],
};

export interface MessagePayloadField {
  name: string;
  type: string;
  value: string;
}

export interface Message {
  primaryType?: string;
  payload: MessagePayloadField[];
}

const copyText = (event: any, text: string | undefined) => {
  event.preventDefault();
  console.log("copyText", text);

  navigator.clipboard.writeText(text || "");
};

const Home: NextPage = () => {
  const [domain, setDomain] = useState<EIP712Payload["domain"]>(defaultDomain);

  const [message, setMessage] = useState<Message>(defaultMessage);

  // console.log("domain is", domain);
  // console.log("message is", message);

  const data = usePayload(domain, message);

  console.log("data is", data);

  const signatureResult = useSignature(data);

  return (
    <main className="relative mx-auto mt-12 min-h-screen bg-white px-4 pb-12 md:px-8 lg:mt-24 lg:max-w-7xl ">
      <h1 className="mb-8 text-3xl">Signature Debugger</h1>

      <div className="lg:flex lg:flex-row lg:justify-between ">
        <div className="lg:mr-12 lg:w-1/2">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl">Domain Separator</h2>
            <DomainSeparatorBuilder domain={domain} setDomain={setDomain} />
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl">Message</h2>

            <MessageBuilder message={message} setMessage={setMessage} />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl">Signature</h2>

            <SignaturePreview
              signatureResult={signatureResult}
              copyIcon={copyIcon}
              copyText={copyText}
            />
          </div>

          <div>
            <h2 className="mb-4 text-2xl">EIP-712 Payload</h2>

            <PayloadPreview
              copyIcon={copyIcon}
              data={data}
              copyText={copyText}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
