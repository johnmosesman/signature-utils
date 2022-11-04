import { SignatureResult } from "../../lib/hooks/use-signature";

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
          <p>Error:</p>
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
            className={`group relative mb-4 rounded-sm bg-gray-100 p-4 ${
              signatureResult?.signature ? "cursor-pointer" : ""
            }`}
            style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
            onClick={(e) =>
              signatureResult?.signature &&
              copyText(e, signatureResult?.signature)
            }
          >
            <p>{signatureResult?.signature}</p>

            {signatureResult?.signature && (
              <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
                {copyIcon}
              </div>
            )}
          </div>

          <div>
            <p>r:</p>
            <div
              className={`group relative mb-4 rounded-sm bg-gray-100 p-4 ${
                signatureResult?.r ? "cursor-pointer" : ""
              }`}
              style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
              onClick={(e) =>
                signatureResult?.r && copyText(e, signatureResult?.r)
              }
            >
              <p>{signatureResult?.r}</p>

              {signatureResult?.r && (
                <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
                  {copyIcon}
                </div>
              )}
            </div>
          </div>

          <div>
            <p>s:</p>
            <div
              className={`group relative mb-4 rounded-sm bg-gray-100 p-4 ${
                signatureResult?.s ? "cursor-pointer" : ""
              }`}
              style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
              onClick={(e) =>
                signatureResult?.s && copyText(e, signatureResult?.s)
              }
            >
              <p>{signatureResult?.s}</p>

              {signatureResult?.s && (
                <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
                  {copyIcon}
                </div>
              )}
            </div>
          </div>

          <div>
            <p>v:</p>
            <div
              className={`group relative mb-4 rounded-sm bg-gray-100 p-4 ${
                signatureResult?.v ? "cursor-pointer" : ""
              }`}
              style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
              onClick={(e) =>
                signatureResult?.v && copyText(e, signatureResult?.v)
              }
            >
              <p>{signatureResult?.v}</p>

              {signatureResult?.v && (
                <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
                  {copyIcon}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
