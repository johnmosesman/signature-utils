import { Contract, ethers, providers, Wallet } from "ethers";
import { Field, Formik } from "formik";
import { useState } from "react";
import { EIP712Payload } from "../../lib/eip712-utils";
import { ABIInput, ABIItem } from "../../lib/hooks/use-abi";
import { SignatureResult } from "../../lib/hooks/use-signature";

const handleSubmit = async (
  contractAddress: string,
  item: ABIItem,
  wallet: Wallet,
  formData: FormData
) => {
  console.log("handleSubmit", item.name, formData);

  const contract: Contract = new Contract(
    contractAddress,
    [item],
    providers.getDefaultProvider()
  );

  console.log("boop", ...Object.values(formData));

  const result = await contract.callStatic[item.name](
    ...Object.values(formData)
  );

  console.log("result", result);
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
};

export default function FunctionTester({
  payload,
  signatureResult,
  contractAddress,
  wallet,
  item,
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

      {isOpen && wallet && (
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
              handleSubmit(contractAddress, item, wallet, values);
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
                      <Field name={input.name} type="text" Required="true" />
                    </div>
                  );
                })}

                <button
                  type="submit"
                  className="rounded border border-gray-300 px-4 py-1 mt-2 bg-white"
                >
                  Static Call
                </button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
