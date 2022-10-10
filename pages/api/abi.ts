// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// TODO: Add more specific types especially for type fields (address, bytes, etc)
export type ABI = {
  inputs: { internalType: string; name: string; type: string }[];
  name: string;
  outputs: { internalType: string; name: string; type: string }[];
  stateMutability: string;
  type: string;
}[];

type ABIResult = {
  status: "1" | "0";
  message: string;
  result: string;
};

const fetchABI = async (contractAddress: string): Promise<ABI | null> => {
  console.log("fetchABI()");

  try {
    const url =
      "https://api.polygonscan.com/api" +
      "?module=contract" +
      "&action=getabi" +
      `&address=${contractAddress}` +
      `&apikey=${process.env.POLYGONSCAN_API_KEY}`;

    const response = await fetch(url, {
      method: "GET",
    });

    const json: ABIResult = await response.json();
    console.log("json", json);

    return JSON.parse(json.result) as ABI;
  } catch (e) {
    console.log("Error fetching ABI", e);
    return null;
  }
};

export type FetchABIResponse = {
  abi?: ABI;
  errorMessage?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchABIResponse>
) {
  const abi: ABI | null = await fetchABI(
    req.query["contractAddress"] as string
  );

  if (!abi) {
    res.status(200).json({ errorMessage: "Error fetching contract ABI" });
    return;
  }

  res.status(200).json({ abi });
}
