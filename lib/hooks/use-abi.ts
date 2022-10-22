import { useEffect, useState } from "react";

// TODO: Add more specific types especially for type fields (address, bytes, etc)

export type ABIInput = { internalType: string; name: string; type: string };

export type ABIItem = {
  inputs: ABIInput[];
  name: string;
  outputs: { internalType: string; name: string; type: string }[];
  stateMutability: string;
  type: string;
};

export type ABI = ABIItem[];

const fetchABI = async (contractAddress: string): Promise<ABI | null> => {
  console.log("getABI()");

  const response = await fetch(`/api/abi?contractAddress=${contractAddress}`, {
    method: "GET",
  });

  // console.log("response", response);

  const abi: ABI | null = await response.json();

  return abi;
};

export const useABI = (contractAddress: string) => {
  const [abi, setABI] = useState<ABI | null>();

  useEffect(() => {
    fetchABI(contractAddress).then((a) => setABI(a));
  }, [contractAddress]);

  return abi;
};
