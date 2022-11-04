import { ethers, utils } from "ethers";
import {
  AbiCoder,
  hexlify,
  hexZeroPad,
  keccak256,
  toUtf8Bytes,
} from "ethers/lib/utils";
import { EIP712Payload } from "../../lib/eip712-utils";
import { SignatureResult } from "../../lib/hooks/use-signature";

interface Props {
  payload?: EIP712Payload;
}

function calculateDomainTypehash(
  domain: EIP712Payload["domain"] | undefined
): string {
  if (!domain || !domain.name || !domain.version) {
    return "";
  }

  const coder = new AbiCoder();

  // keccak256("EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)")

  const encoded = coder.encode(
    ["bytes32", "bytes32", "bytes32", "address", "bytes32"],
    [
      "0x36c25de3e541d5d970f66e4210d728721220fff5c077cc6cd008b3a0c62adab7",
      keccak256(toUtf8Bytes(domain.name)),
      keccak256(toUtf8Bytes(domain.version)),
      domain?.verifyingContract,
      // "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      domain?.salt,
      // "0x0000000000000000000000000000000000000000000000000000000000000089",
      // hexZeroPad(hexlify(137), 32),
    ]
  );

  // works

  // utils.toUtf8Bytes(
  //   "EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)"
  // )

  return keccak256(encoded);
}

export default function TypehashPreview({ payload }: Props) {
  const domainTypehash: string = calculateDomainTypehash(payload?.domain);
  const messageTypehash: string = "";

  const coder = new AbiCoder();

  return (
    <div>
      <p>{toUtf8Bytes("USD Coin (PoS)")}</p>
      <p>{toUtf8Bytes("1")}</p>
      <p>
        name{" "}
        {coder.encode(["bytes"], [keccak256(toUtf8Bytes("USD Coin (PoS)"))])}
      </p>
      <p>
        name 32{" "}
        {coder.encode(["bytes32"], [keccak256(toUtf8Bytes("USD Coin (PoS)"))])}
      </p>
      <p>
        {coder.encode(
          ["bytes32", "bytes32"],
          [
            hexZeroPad(hexlify(137), 32),
            keccak256(toUtf8Bytes("USD Coin (PoS)")),
          ]
        )}
      </p>
      <p>
        {coder.encode(["string"], [keccak256(toUtf8Bytes("USD Coin (PoS)"))])}
      </p>
      <p>EIP712 Domain typehash</p>
      <p>0x36c25de3e541d5d970f66e4210d728721220fff5c077cc6cd008b3a0c62adab7</p>

      <p>Domain Separator typehash</p>
      <p>0x294369e003769a2d4d625e8a9ebebffa09ff70dd7c708497d8b56d2c2d199a19</p>

      <p>{domainTypehash}</p>

      <p>Message Typehash</p>
      <p>{messageTypehash}</p>
    </div>
  );
}
