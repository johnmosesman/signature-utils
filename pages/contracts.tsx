import { Contract } from "ethers";
import { NextPage } from "next";
import { useState } from "react";
import { ABI, FetchABIResponse } from "./api/abi";

const mUSDC_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";

const getABI = async (contractAddress: string): Promise<ABI | null> => {
  console.log("getABI()");

  const response = await fetch(`/api/abi?contractAddress=${contractAddress}`, {
    method: "GET",
  });

  console.log("response", response);

  const abi: ABI | null = await response.json();

  return abi;
};

const contractAddressChanged = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setContractAddress: Function,
  setABI: Function
) => {
  e.preventDefault();

  console.log("contractAddressChanged()");

  const contractAddress = e.target.value;

  if (!e.target.value) {
    return;
  }

  const abi: ABI | null = await getABI(contractAddress);

  console.log("abi fetched", abi);

  if (!abi) {
    return;
  }

  console.log("worked");

  setContractAddress(contractAddress);
  setABI(abi);
};

const Contracts: NextPage = () => {
  const [contractAddress, setContractAddress] = useState<string>();
  const [abi, setABI] = useState<ABI>();

  return (
    <main className="relative mx-auto mt-12 min-h-screen bg-white px-4 pb-12 md:px-8 lg:mt-24 lg:max-w-7xl ">
      <h1 className="mb-8 text-3xl">Contracts Tester</h1>

      <form>
        <label htmlFor="contractAddress">Contract Address</label>
        <input
          name="contractAddress"
          type="text"
          className="w-full rounded-sm border border-gray-400 py-1"
          defaultValue={contractAddress}
          onChange={(e) =>
            contractAddressChanged(e, setContractAddress, setABI)
          }
          placeholder="0xabcabcabcabcabcabcabcabcabcabcabcabcabca"
        />
      </form>
    </main>
  );
};

export default Contracts;
