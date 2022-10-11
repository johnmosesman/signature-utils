import { useState } from "react";
import { useABI } from "../lib/hooks/use-abi";

const mUSDC_ADDRESS = "0xdd9185db084f5c4fff3b4f70e7ba62123b812226";

const executeFunction = async (functionName: string) => {
  console.log("functionName", functionName);
  //
};

const contractAddressChanged = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setContractAddress: Function
) => {
  e.preventDefault();

  console.log("contractAddressChanged()");

  const contractAddress = e.target.value;

  if (!e.target.value) {
    return;
  }

  setContractAddress(contractAddress);
};

const ContractTester = () => {
  const [contractAddress, setContractAddress] = useState<string>(mUSDC_ADDRESS);

  const abi = useABI(contractAddress);
  const filteredABI = abi?.filter((item) => item.type === "function");

  const [result, setResult] = useState<string>();

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-4 text-sm uppercase">Contracts Tester</h1>

        <form>
          <label htmlFor="contractAddress">Contract Address</label>
          <input
            name="contractAddress"
            type="text"
            className="w-full rounded-sm border border-gray-400 py-1"
            defaultValue={contractAddress}
            onChange={(e) => contractAddressChanged(e, setContractAddress)}
            placeholder="0xabcabcabcabcabcabcabcabcabcabcabcabcabca"
          />
        </form>
      </div>

      {result && (
        <div className="mb-8">
          <h1 className="mb-2 text-xl">Result</h1>
        </div>
      )}

      <div className="mb-8">
        <h1 className="mb-2 text-xl">ABI</h1>

        <div className="bg-gray-100 p-4 rounded break-all">
          {filteredABI &&
            filteredABI.length > 0 &&
            filteredABI.map((item, index) => {
              return (
                <div key={index} className="flex flex-row mb-4 items-center">
                  <p className="mr-4 w-[75%]">{item.name}</p>

                  <div className="flex justify-end w-[25%]">
                    <button
                      onClick={() => executeFunction(item.name)}
                      className="rounded border border-gray-300 px-4 py-1"
                    >
                      Test
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ContractTester;
