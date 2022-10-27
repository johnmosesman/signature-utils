import { SignatureResult } from "../../lib/hooks/use-signature";
import type { JsonRpcSigner } from "@ethersproject/providers";
import SignaturePreview from "./signature-preview";
import SignaturePreviewSigner from "./signature-preview-signer";
import { EIP712Payload } from "../../lib/eip712-utils";

interface Props {
  signer?: JsonRpcSigner;
  payload?: EIP712Payload;
  signatureResult?: SignatureResult;
  copyIcon: React.ReactElement;
  copyText: Function;
}

export default function SignaturePreviewer({
  signer,
  payload,
  signatureResult,
  copyIcon,
  copyText,
}: Props) {
  return (
    <div>
      {!signer && (
        <SignaturePreview
          signatureResult={signatureResult}
          copyIcon={copyIcon}
          copyText={copyText}
        />
      )}

      {signer && (
        <SignaturePreviewSigner
          payload={payload}
          copyIcon={copyIcon}
          copyText={copyText}
          signer={signer}
        />
      )}
    </div>
  );
}
