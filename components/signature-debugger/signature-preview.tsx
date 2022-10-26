import { SignatureResult } from "../../lib/hooks/use-signature";
import type { JsonRpcSigner } from "@ethersproject/providers";

interface Props {
  signatureResult: SignatureResult | undefined;
  copyIcon: React.ReactElement;
  copyText: Function;
}

export default function SignaturePreview({
  signatureResult,
  copyIcon,
  copyText,
}: Props) {
  return (
    <div>
      {signatureResult?.error && (
        <div>
          k <p>Error:</p>
          <div
            className="rounded-sm bg-gray-100 p-4"
            style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
          >
            <p>{signatureResult?.error}</p>
          </div>
        </div>
      )}

      {!signatureResult?.error && (
        <div>
          <p>signature:</p>
          <div
            className="group relative mb-4 cursor-pointer rounded-sm bg-gray-100 p-4"
            style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
            onClick={(e) => copyText(e, signatureResult?.signature)}
          >
            <p>{signatureResult?.signature}</p>

            <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
              {copyIcon}
            </div>
          </div>

          <div>
            <p>r:</p>
            <div
              className="group relative mb-4 cursor-pointer rounded-sm bg-gray-100 p-4"
              style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
              onClick={(e) => copyText(e, signatureResult?.r)}
            >
              <p>{signatureResult?.r}</p>

              <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
                {copyIcon}
              </div>
            </div>
          </div>

          <div>
            <p>s:</p>
            <div
              className="group relative mb-4 cursor-pointer rounded-sm bg-gray-100 p-4"
              style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
              onClick={(e) => copyText(e, signatureResult?.s)}
            >
              <p>{signatureResult?.s}</p>

              <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
                {copyIcon}
              </div>
            </div>
          </div>

          <div>
            <p>v:</p>
            <div
              className="group relative mb-4 cursor-pointer rounded-sm bg-gray-100 p-4"
              style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
              onClick={(e) => copyText(e, signatureResult?.v)}
            >
              <p>{signatureResult?.v}</p>
              <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
                {copyIcon}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
