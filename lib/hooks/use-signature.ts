import { ethers, Wallet } from "ethers";
import { useEffect, useState } from "react";
import { EIP712Payload } from "../eip712-utils";
import type { JsonRpcSigner } from "@ethersproject/providers";

export interface SignatureResult {
  signature?: string;
  r?: string;
  s?: string;
  v?: string;
  error?: string;
}

// ethersjs automatically includes the EIP712Domain type so remove it from the payload
const filteredTypes = (types: EIP712Payload["types"]) => {
  return Object.fromEntries(
    Object.entries(types).filter(([k, v]) => k !== "EIP712Domain")
  );
};

const sign = async (
  data: EIP712Payload,
  signer: JsonRpcSigner | Wallet
): Promise<SignatureResult> => {
  try {
    const signature: string = await signer._signTypedData(
      data.domain,
      filteredTypes(data.types),
      data.message
    );

    return {
      signature,
      r: `0x${signature.slice(2, 66)}`,
      s: `0x${signature.slice(66, 130)}`,
      v: `0x${signature.slice(signature.length - 2, signature.length)}`,
    };
  } catch (e) {
    let message = "";

    if (typeof e === "string") {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    } else {
      console.log("Unknown error type");
      message = "Unknown error";
    }

    console.log("error:", message);

    return {
      error: message,
    };
  }
};

export const useSignature = (
  data: EIP712Payload | undefined,
  signer: JsonRpcSigner | Wallet | undefined
): SignatureResult | undefined => {
  const [signatureResult, setSignatureResult] = useState<SignatureResult>();

  useEffect(() => {
    if (!data || !signer) {
      return;
    }

    sign(data, signer).then((sr) => setSignatureResult(sr));
  }, [data, signer]);

  return signatureResult;
};
