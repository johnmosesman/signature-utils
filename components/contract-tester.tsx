import { useState } from "react";
import { EIP712Payload } from "../lib/eip712-utils";
import { useABI } from "../lib/hooks/use-abi";
import { SignatureResult } from "../lib/hooks/use-signature";
import FunctionTester from "./contracts-tester/function-tester";
import PayloadPreview from "./signature-debugger/payload-preview";
import SignaturePreview from "./signature-debugger/signature-preview";

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

type Props = {
  payload?: EIP712Payload;
  signatureResult?: SignatureResult;
  copyIcon: JSX.Element;
  copyText: Function;
};

const ContractTester = ({
  payload,
  signatureResult,
  copyIcon,
  copyText,
}: Props) => {
  const [contractAddress, setContractAddress] = useState<string>(mUSDC_ADDRESS);

  const abi = useABI(contractAddress);
  const filteredABI = abi?.filter((item) => item.type === "function");

  console.log("ftileredABI", filteredABI);

  const [result, setResult] = useState<string>();

  return (
    <>
      <p className="mb-8">
        Enter a contract address to test your payload against its functions.
      </p>

      <div className="lg:flex lg:flex-row lg:justify-between ">
        <div className="lg:mr-12 lg:w-1/2">
          <form className="mb-8">
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

          {result && (
            <div className="mb-8">
              <h1 className="mb-2 text-xl">Result</h1>
            </div>
          )}

          <div className="mb-8">
            <h1 className="mb-2 text-xl">ABI</h1>

            <div className="bg-white rounded break-all">
              {filteredABI &&
                filteredABI.length > 0 &&
                filteredABI.map((item, index) => {
                  return (
                    <FunctionTester
                      item={item}
                      payload={payload}
                      signatureResult={signatureResult}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="mb-8">
            <h2 className="mb-2 text-xl">Signature Result</h2>
            <SignaturePreview
              signatureResult={signatureResult}
              copyIcon={copyIcon}
              copyText={copyText}
            />
          </div>

          <div>
            <h2 className="mb-2 text-xl">EIP-712 Payload</h2>

            <PayloadPreview
              copyIcon={copyIcon}
              payload={payload}
              copyText={copyText}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractTester;
