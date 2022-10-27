import { SignatureResult } from "../../lib/hooks/use-signature";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { useState } from "react";
import { EIP712Payload, sign } from "../../lib/eip712-utils";
import SignaturePreview from "./signature-preview";

interface Props {
  payload?: EIP712Payload;
  copyIcon: React.ReactElement;
  copyText: Function;
  signer: JsonRpcSigner;
}

export default function SignaturePreviewSigner({
  payload,
  copyIcon,
  copyText,
  signer,
}: Props) {
  const [signatureResult, setSignatureResult] = useState<SignatureResult>();

  console.log("MM sig res", signatureResult);

  return (
    <div>
      {signer && payload && (
        <button
          onClick={async () => {
            const result = await sign(payload, signer);
            setSignatureResult(result);
          }}
          className="text-sm text-gray-600 border border-gray-600 rounded px-2 py-1 mb-4"
        >
          Sign With MetaMask
        </button>
      )}

      <SignaturePreview
        signatureResult={signatureResult}
        copyIcon={copyIcon}
        copyText={copyText}
      />
    </div>
  );
}
