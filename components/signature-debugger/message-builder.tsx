import { Message } from "../../lib/eip712-utils";

const PAYLOAD_TYPES = [
  "uint256",
  "address",
  "string",
  "bytes",
  "bytes32",
].sort();

interface Props {
  message: Message;
  setMessage: Function;
}

export default function MessageBuilder({ message, setMessage }: Props) {
  return (
    <div className="flex flex-col border-gray-300 border rounded-md px-2 py-4">
      <form>
        <fieldset>
          <div>
            <label htmlFor="custom-type-name">Custom Type Name</label>
            <input
              name="primary-type"
              type="text"
              defaultValue={message.primaryType}
              onChange={(e) => {
                e.preventDefault();
                setMessage({ ...message, primaryType: e.target.value });
              }}
              placeholder="MyMetaTx"
            />
          </div>

          {message.payload.map((item, index) => {
            return (
              <div key={index} className="pt-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="mb-4 w-1/2 mr-2">
                    <label htmlFor={`message-attribute-name-${index}`}>
                      Name
                    </label>
                    <input
                      name={`message-attribute-name-${index}`}
                      type="text"
                      value={item["name"]}
                      onChange={(e) => {
                        e.preventDefault();
                        item.name = e.target.value;
                        setMessage({
                          ...message,
                        });
                      }}
                      placeholder="from"
                    />
                  </div>

                  <div className="mb-4 w-1/2">
                    <label htmlFor={`message-attribute-type-${index}`}>
                      Type
                    </label>
                    <select
                      name={`message-attribute-type-${index}`}
                      value={item["type"]}
                      onChange={(e) => {
                        e.preventDefault();
                        item.type = e.target.value;
                        setMessage({
                          ...message,
                        });
                      }}
                    >
                      {PAYLOAD_TYPES.map((type) => {
                        return (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`message-attribute-value-${index}`}
                    className="block"
                  >
                    Value
                  </label>
                  <input
                    name={`message-attribute-value-${index}`}
                    type="text"
                    value={item["value"]}
                    onChange={(e) => {
                      e.preventDefault();
                      item.value = e.target.value;
                      setMessage({ ...message });
                    }}
                    placeholder="0xabcabcabcabcabcabcabcabcabcabcabcabcabca"
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const newPayload = message.payload.filter(
                      (p, i) => index !== i
                    );

                    setMessage({
                      ...message,
                      payload: [...newPayload],
                    });
                  }}
                  className="rounded border border-gray-300 px-3 py-1"
                >
                  Remove
                </button>
              </div>
            );
          })}

          <button
            onClick={(e) => {
              e.preventDefault();
              const defaultMessagePayload = {
                name: "",
                type: "address",
                value: "",
              };

              setMessage({
                ...message,
                payload: [...message.payload, defaultMessagePayload],
              });
            }}
            className="mt-4 rounded border border-gray-300 px-3 py-2"
          >
            Add Another
          </button>
        </fieldset>
      </form>
    </div>
  );
}
