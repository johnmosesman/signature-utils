import { useState } from "react";
import { EIP712Payload } from "../../lib/eip712-utils";
import { ABIItem } from "../../lib/hooks/use-abi";

const executeFunction = async (functionName: string) => {
  console.log("functionName", functionName);
  //
};

type Props = {
  payload?: EIP712Payload;
  item: ABIItem;
};
export default function FunctionTester({ payload, item }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-100 flex flex-col mb-4 px-4 py-2">
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="mr-4">{item.name}</p>

        {isOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
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
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </div>

      {isOpen && (
        <div className="bg-gray-100 mt-4">
          {item.inputs.map((input, i) => {
            return (
              <div key={i} className="mb-2">
                <label className="mb-2">
                  {input.name} ({input.type})
                </label>
                <input name={input.name} type="text" />
              </div>
            );
          })}

          <button
            onClick={() => executeFunction(item.name)}
            className="rounded border border-gray-300 px-4 py-1 mt-4"
          >
            Static Call
          </button>
        </div>
      )}
    </div>
  );
}
