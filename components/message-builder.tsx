import { type Message } from "../lib/eip712-utils";

const PAYLOAD_TYPES = ["uint256", "address", "string", "bytes"].sort();

interface Props {
  message: Message;
  setMessage: Function;
}

export default function MessageBuilder({ message, setMessage }: Props) {
  return (
    <div className="flex flex-col">
      <form>
        <fieldset>
          <div className="mb-4">
            <label htmlFor="custom-type-name" className="block">
              Custom Type Name
            </label>
            <input
              name="primary-type"
              type="text"
              className="w-full rounded-sm border border-gray-400 px-3 py-2"
              defaultValue={message.primaryType}
              onChange={(e) => {
                e.preventDefault();
                setMessage({ ...message, primaryType: e.target.value });
              }}
            />
          </div>
          {message.payload.map((item, index) => {
            return (
              <div key={index} className="mt-8 border-t-2 border-gray-400 pt-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor={`message-attribute-name-${index}`}
                      className="block"
                    >
                      Name
                    </label>
                    <input
                      name={`message-attribute-name-${index}`}
                      type="text"
                      className="w-full rounded-sm border border-gray-400 px-3 py-2"
                      value={message.payload[index]["name"]}
                      onChange={(e) => {
                        e.preventDefault();
                        const item = message.payload[index];
                        item.name = e.target.value;
                        setMessage({
                          ...message,
                        });
                      }}
                    />
                  </div>

                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor={`message-attribute-type-${index}`}
                      className="block text-right"
                    >
                      Type
                    </label>
                    <select
                      name={`message-attribute-type-${index}`}
                      className="w-full rounded-sm border border-gray-400 px-3 py-3 text-right"
                      style={{ height: "42px" }}
                      value={message.payload[index]["type"]}
                      onChange={(e) => {
                        e.preventDefault();
                        const item = message.payload[index];
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
                    className="w-full rounded-sm border border-gray-400 px-3 py-2"
                    value={message.payload[index]["value"]}
                    onChange={(e) => {
                      e.preventDefault();
                      const item = message.payload[index];
                      item.value = e.target.value;
                      setMessage({ ...message });
                    }}
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
                  className="rounded-sm border border-gray-400 px-3 py-2"
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
            className="mt-4 rounded-sm border border-gray-400 px-3 py-2"
          >
            Add Another
          </button>
        </fieldset>
      </form>
    </div>
  );
}
