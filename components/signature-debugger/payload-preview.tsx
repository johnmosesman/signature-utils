import { BigNumber } from "ethers";
import {
  type EIP712CustomField,
  type EIP712DomainAttribute,
  type EIP712DomainField,
  type EIP712Payload,
} from "../../lib/eip712-utils";

interface Props {
  payload?: EIP712Payload;
  copyIcon: React.ReactElement;
  copyText: Function;
}

export default function PayloadPreview({ payload, copyIcon, copyText }: Props) {
  if (!payload) {
    return <></>;
  }

  return (
    <div
      className="group relative cursor-pointer rounded-sm bg-gray-100 p-4"
      style={{ fontFamily: "monospace", overflowWrap: "break-word" }}
      onClick={(e) => {
        Object.entries(payload.message).forEach(([key, value]) => {
          if (BigNumber.isBigNumber(value)) {
            payload.message[key] = `$TEMP$${value}$TEMP$`;
          }
        });

        // Rendering BigNumber in JSON wraps the values in quotes as a string,
        // but we want it to display as the number value.
        const json = JSON.stringify(payload, null, 4)
          .replace('"$TEMP$', "")
          .replace('$TEMP$"', "");

        copyText(e, json);
      }}
    >
      <p>&#123;</p>

      <div className="ml-4">
        <p>domain: &#123;</p>

        <div className="ml-4">
          {Object.keys(payload.domain).map((key, index) => {
            const value = payload.domain[key as EIP712DomainAttribute];
            const text = key === "chainId" ? value : `"${value}"`;

            return (
              <p key={index}>
                {key}: {text},
              </p>
            );
          })}
        </div>

        <p>&#125;,</p>
      </div>

      <div className="ml-4">
        <p>types: &#123;</p>
      </div>

      <div className="ml-4">
        {Object.keys(payload.types).map((key, index) => {
          const attributes = payload.types[key].map(
            (hash: EIP712DomainField | EIP712CustomField) => {
              return (
                <div key={`${hash.name}-${hash.type}`} className="ml-4">
                  &#123;
                  <div className="ml-4">
                    <p>name: &quot;{hash.name}&quot;,</p>
                    <p>type: &quot;{hash.type}&quot;,</p>
                  </div>
                  &#125;,
                </div>
              );
            }
          );

          return (
            <div key={key} className="ml-4">
              <p>{key}: [</p>
              {attributes}
              <p>],</p>
            </div>
          );
        })}

        <p>&#125;,</p>
      </div>

      <div className="ml-4">
        <p>primaryType: &quot;{payload.primaryType}&quot;,</p>
      </div>

      <div className="ml-4">
        <p>message: &#123;</p>

        <div className="ml-4">
          {Object.keys(payload.message).map((key, index) => {
            const value = payload.message[key];
            let text;

            if (BigNumber.isBigNumber(value)) {
              text = value.toString();
            } else if (typeof value === "string") {
              text = `"${value}"`;
            } else {
              text = value;
            }

            return (
              <p key={index}>
                {key}: {text},
              </p>
            );
          })}
        </div>

        <p>&#125;</p>
      </div>

      <p>&#125;</p>

      <div className="absolute top-3 right-3 hidden bg-gray-100 group-hover:block">
        {copyIcon}
      </div>
    </div>
  );
}
