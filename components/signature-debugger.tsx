import DomainSeparatorBuilder from "./signature-debugger/domain-separator-builder";
import MessageBuilder from "./signature-debugger/message-builder";
import { EIP712Payload, Message } from "../lib/eip712-utils";

type Props = {
  domain: EIP712Payload["domain"];
  setDomain: Function;
  message: Message;
  setMessage: Function;
};

export default function SignatureDebugger({
  domain,
  setDomain,
  message,
  setMessage,
}: Props) {
  return (
    <div className="lg:mr-12">
      <p className="mb-4 text-sm">
        Build your custom signature message and view its EIP712 payload and
        signature.
      </p>

      <div className="flex flex-col">
        <div className="mb-8">
          <div className="flex flex-col mb-2 ">
            <h2 className="text-xl mr-2">Domain Separator</h2>
            <p className="text-xs text-gray-600">(All fields are optional)</p>
          </div>
          <DomainSeparatorBuilder domain={domain} setDomain={setDomain} />
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-xl">Message</h2>
          <MessageBuilder message={message} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
}
