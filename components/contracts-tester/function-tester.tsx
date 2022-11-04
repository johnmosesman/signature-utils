import { Contract, ethers, Wallet } from "ethers";
import { Field, Formik } from "formik";
import { useState } from "react";
import {
  EIP712Payload,
  Message,
  MessagePayloadField,
} from "../../lib/eip712-utils";
import { ABIInput, ABIItem } from "../../lib/hooks/use-abi";
import { SignatureResult } from "../../lib/hooks/use-signature";
import type { JsonRpcSigner } from "@ethersproject/providers";
import toast from "react-hot-toast";
import { errorToString } from "../../lib/utils";

const mapInputsToMessage = (inputs: ABIInput[]): Message => {
  const filteredInputs: ABIInput[] = inputs.filter(
    (input: ABIInput) =>
      !["v", "r", "s", "signature"].includes(input.name.toLowerCase())
  );

  const payload: MessagePayloadField[] = filteredInputs.map(
    (input: ABIInput): MessagePayloadField => {
      let defaultValue: string = "0";

      if (input.type === "address") {
        defaultValue = ethers.constants.AddressZero;
      } else if (input.type.includes("uint")) {
        defaultValue = "0";
      } else if (input.type.includes("bytes")) {
        defaultValue = ethers.utils.formatBytes32String("");
      }

      return {
        name: input.name,
        type: input.type,
        value: defaultValue,
      };
    }
  );

  return {
    primaryType: "TODO-PRIMARY-TYPE",
    payload: payload,
  };
};

const handleSubmit = async (
  contractAddress: string,
  item: ABIItem,
  signer: JsonRpcSigner | Wallet | undefined,
  formData: FormData,
  setCallResult: Function
) => {
  if (!signer) {
    return;
  }
  console.log("handleSubmit", item.name, formData);

  try {
    const contract: Contract = new Contract(contractAddress, [item], signer);
    // const contract: Contract = new Contract(
    //   "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    //   [item],
    //   signer
    // );

    const result = await contract.callStatic[item.name](
      ...Object.values(formData)
    );

    setCallResult(
      result.toString() || "(call was success but empty result returned)"
    );

    toast.success("Call succeeded");
  } catch (error) {
    const message = errorToString(error);
    console.error("Error", message);
    setCallResult(message);
    toast.error("Call failed");
  }
};

type FormData = {
  [key: string]: string;
};

type Props = {
  payload?: EIP712Payload;
  signatureResult?: SignatureResult;
  wallet?: Wallet;
  contractAddress: string;
  item: ABIItem;
  setPanelToDebugger: Function;
  message: Message;
  setMessage: Function;
  signer?: JsonRpcSigner;
  setCallResult: Function;
};

export default function FunctionTester({
  payload,
  signatureResult,
  contractAddress,
  wallet,
  item,
  setPanelToDebugger,
  message,
  setMessage,
  signer,
  setCallResult,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialFormValues = item.inputs.reduce(
    (obj: FormData, curr: ABIInput) => {
      let defaultValue: string | number = "";

      if (payload?.message[curr.name]) {
        defaultValue = payload?.message[curr.name];
      } else if (signatureResult?.v && curr.name.toLowerCase() === "v") {
        defaultValue = signatureResult.v;
      } else if (signatureResult?.r && curr.name.toLowerCase() === "r") {
        defaultValue = signatureResult.r;
      } else if (signatureResult?.s && curr.name.toLowerCase() === "s") {
        defaultValue = signatureResult.s;
      } else if (
        signatureResult?.signature &&
        curr.name.toLowerCase() === "signature"
      ) {
        defaultValue = signatureResult.signature;
      }
      return { ...obj, [curr.name]: defaultValue.toString() };
    },
    {} as FormData
  );

  // console.log(
  //   "item",
  //   item.inputs,
  //   isOpen && signer !== undefined && wallet !== undefined
  // );

  return (
    <div className="bg-gray-100 flex flex-col mb-4 px-4 py-2">
      <div
        className="flex flex-row items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="mr-4" style={{ fontFamily: "monospace" }}>
          {item.name}
        </p>

        {isOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
        {!isOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </div>

      {isOpen && (signer !== undefined || wallet !== undefined) && (
        <div className="bg-gray-100 mt-4">
          <Formik
            initialValues={initialFormValues}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.email) {
            //     errors.email = "Required";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = "Invalid email address";
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("onsubmit", values);

              handleSubmit(
                contractAddress,
                item,
                signer || wallet,
                values,
                setCallResult
              );
            }}
          >
            {({
              // values,
              // errors,
              // touched,
              // handleChange,
              // handleBlur,
              handleSubmit,
              // isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                {item.inputs.map((input, i) => {
                  return (
                    <div key={i} className="mb-2">
                      <label className="mb-2">
                        {input.name} ({input.type})
                      </label>
                      <Field name={input.name} type="text" required />
                    </div>
                  );
                })}

                <div className="mt-8 flex items-center">
                  <button
                    type="submit"
                    className="rounded border border-gray-300 px-4 py-1 bg-white mr-4"
                  >
                    Static Call
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      setPanelToDebugger();

                      const message: Message = mapInputsToMessage(item.inputs);

                      setMessage(message);
                    }}
                    className="rounded border border-gray-300 px-4 py-1 bg-white mr-4"
                  >
                    Load Parameters In Builder
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
