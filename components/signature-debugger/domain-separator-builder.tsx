import { EIP712Payload } from "../../lib/eip712-utils";

interface Props {
  domain: EIP712Payload["domain"];
  setDomain: Function;
}

export default function DomainSeparatorBuilder({ domain, setDomain }: Props) {
  return (
    <div className="flex flex-col mb-4 border-gray-300 border rounded-md px-2 py-4">
      <form>
        <fieldset>
          <div>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                defaultValue={domain?.name}
                onChange={(e) => setDomain({ ...domain, name: e.target.value })}
                placeholder="MyCoolApp"
              />
            </div>

            <div className="flex flex-row items-center justify-between mb-4">
              <div className="w-1/2 mr-4">
                <label htmlFor="version">Version</label>
                <input
                  name="version"
                  type="text"
                  defaultValue={domain?.version}
                  onChange={(e) =>
                    setDomain({ ...domain, version: e.target.value })
                  }
                  placeholder="0.0.1"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="chainId">Chain ID</label>
                <input
                  name="chainId"
                  type="text"
                  defaultValue={domain?.chainId}
                  onChange={(e) =>
                    setDomain({ ...domain, chainId: e.target.value })
                  }
                  placeholder="137"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="verifyingContract">
                Verifying Contract Address
              </label>
              <input
                name="verifyingContract"
                type="text"
                defaultValue={domain?.verifyingContract}
                onChange={(e) =>
                  setDomain({ ...domain, verifyingContract: e.target.value })
                }
                placeholder="0xabcabcabcabcabcabcabcabcabcabcabcabcabca"
              />
            </div>

            <div>
              <label htmlFor="salt">Salt (32 bytes)</label>
              <input
                name="salt"
                type="text"
                defaultValue={domain?.salt}
                onChange={(e) => setDomain({ ...domain, salt: e.target.value })}
                placeholder="0x0000000000000000000000000000000000000000000000000000000000000089"
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
