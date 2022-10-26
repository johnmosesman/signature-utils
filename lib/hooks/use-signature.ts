import { Wallet } from "ethers";
import { useEffect, useState } from "react";
import { EIP712Payload, sign } from "../eip712-utils";
import type { JsonRpcSigner } from "@ethersproject/providers";

export interface SignatureResult {
  signature?: string;
  r?: string;
  s?: string;
  v?: string;
  error?: string;
}

export const useSignature = (
  data: EIP712Payload | undefined,
  wallet: Wallet | undefined,
  signer: JsonRpcSigner | undefined
): SignatureResult | undefined => {
  const [signatureResult, setSignatureResult] = useState<SignatureResult>();

  useEffect(() => {
    // If we have a signer we've connected MM and don't need to run this default signature
    if (!data || !wallet || signer) {
      return;
    }

    sign(data, wallet).then((sr) => {
      console.log("signatureResult", sr);
      setSignatureResult(sr);
    });
  }, [data, wallet, signer]);

  return signatureResult;
};
