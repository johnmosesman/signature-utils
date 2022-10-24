import { Wallet } from "ethers";
import { useState } from "react";
import { EIP712Payload, Message } from "../lib/eip712-utils";
import { useABI } from "../lib/hooks/use-abi";
import { SignatureResult } from "../lib/hooks/use-signature";
import FunctionTester from "./contracts-tester/function-tester";
import PayloadPreview from "./signature-debugger/payload-preview";
import SignaturePreview from "./signature-debugger/signature-preview";

const mUSDC_ADDRESS = "0xdd9185db084f5c4fff3b4f70e7ba62123b812226";

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
  wallet?: Wallet;
  copyIcon: JSX.Element;
  copyText: Function;
  setPanelToDebugger: Function;
  message: Message;
  setMessage: Function;
};

const ContractTester = ({
  payload,
  signatureResult,
  wallet,
  copyIcon,
  copyText,
  setPanelToDebugger,
  message,
  setMessage,
}: Props) => {
  const [contractAddress, setContractAddress] = useState<string>(mUSDC_ADDRESS);

  const abi = useABI(contractAddress);
  const filteredABI = abi?.filter((item) => item.type === "function");

  console.log("ftileredABI", filteredABI);

  const [result, setResult] = useState<string>();

  return (
    <>
      <p className="mb-8 text-sm">
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
              <h2 className="mb-2 text-sm">Result</h2>
            </div>
          )}

          <div className="mb-8">
            <h2 className="mb-2 text-xl">ABI</h2>

            <div className="bg-white rounded break-all">
              {filteredABI &&
                filteredABI.length > 0 &&
                filteredABI.map((item, index) => {
                  return (
                    <FunctionTester
                      contractAddress={contractAddress}
                      item={item}
                      wallet={wallet}
                      payload={payload}
                      signatureResult={signatureResult}
                      setPanelToDebugger={setPanelToDebugger}
                      message={message}
                      setMessage={setMessage}
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
