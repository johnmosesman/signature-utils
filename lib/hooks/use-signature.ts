import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { type EIP712Payload } from "~/lib/eip712-utils";

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

const sign = async (data: EIP712Payload): Promise<SignatureResult> => {
  try {
    const wallet = ethers.Wallet.createRandom();
    const signer = new ethers.Wallet(
      wallet.privateKey,
      ethers.providers.getDefaultProvider()
    );

    const signature: string = await signer._signTypedData(
      data.domain,
      filteredTypes(data.types),
      data.message
    );

    return {
      signature,
      r: `0x${signature.slice(0, 66)}`,
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

export const useSignature = (data: any): SignatureResult | undefined => {
  const [signatureResult, setSignatureResult] = useState<SignatureResult>();

  useEffect(() => {
    sign(data).then((sr) => setSignatureResult(sr));
  }, [data]);

  return signatureResult;
};
