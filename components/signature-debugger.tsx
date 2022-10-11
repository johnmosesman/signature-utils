import DomainSeparatorBuilder from "./signature-debugger/domain-separator-builder";
import MessageBuilder from "./signature-debugger/message-builder";
import PayloadPreview from "./signature-debugger/payload-preview";
import SignaturePreview from "./signature-debugger/signature-preview";
import { EIP712Payload, Message } from "../lib/eip712-utils";
import { usePayload } from "../lib/hooks/use-payload";
import { SignatureResult, useSignature } from "../lib/hooks/use-signature";

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

const copyText = (event: any, text: string | undefined) => {
  event.preventDefault();
  console.log("copyText", text);

  navigator.clipboard.writeText(text || "");
};

type Props = {
  domain: EIP712Payload["domain"];
  setDomain: Function;
  message: Message;
  setMessage: Function;
  payload?: EIP712Payload;
  signatureResult?: SignatureResult;
  copyIcon: JSX.Element;
  copyText: Function;
};

export default function SignatureDebugger({
  domain,
  setDomain,
  message,
  setMessage,
  payload,
  signatureResult,
  copyIcon,
  copyText,
}: Props) {
  return (
    <>
      <p className="mb-8">
        Build your custom signature message and view its EIP712 payload and
        signature.
      </p>

      <div className="lg:flex lg:flex-row lg:justify-between ">
        <div className="lg:mr-12 lg:w-1/2">
          <div className="mb-8">
            <h2 className="mb-2 text-xl">Domain Separator</h2>
            <DomainSeparatorBuilder domain={domain} setDomain={setDomain} />
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-xl">Message</h2>
            <MessageBuilder message={message} setMessage={setMessage} />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="mb-8">
            <h2 className="mb-2 text-xl">Signature</h2>
            <SignaturePreview
              signatureResult={signatureResult}
              copyIcon={copyIcon}
              copyText={copyText}
            />
          </div>

          <div>
            <h2 className="mb-2 text-xl">EIP-712 Payload</h2>

            <PayloadPreview
              copyIcon={copyIcon}
              payload={payload}
              copyText={copyText}
            />
          </div>
        </div>
      </div>
    </>
  );
}
