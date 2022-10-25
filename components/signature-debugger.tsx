import DomainSeparatorBuilder from "./signature-debugger/domain-separator-builder";
import MessageBuilder from "./signature-debugger/message-builder";
import PayloadPreview from "./signature-debugger/payload-preview";
import SignaturePreview from "./signature-debugger/signature-preview";
import { EIP712Payload, Message } from "../lib/eip712-utils";
import { SignatureResult } from "../lib/hooks/use-signature";
import type { JsonRpcSigner } from "@ethersproject/providers";

type Props = {
  domain: EIP712Payload["domain"];
  setDomain: Function;
  message: Message;
  setMessage: Function;
  payload?: EIP712Payload;
  signatureResult?: SignatureResult;
  copyIcon: JSX.Element;
  copyText: Function;
  signer?: JsonRpcSigner;
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
  signer,
}: Props) {
  return (
    <>
      <p className="mb-4 text-sm">
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
            <h2 className="mb-2 text-xl">Signature Result</h2>
            <SignaturePreview
              signatureResult={signatureResult}
              copyIcon={copyIcon}
              copyText={copyText}
              signer={signer}
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
