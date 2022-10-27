import { BigNumber, constants, Wallet } from "ethers";
import { hexlify, hexZeroPad } from "ethers/lib/utils";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { SignatureResult } from "./hooks/use-signature";

const chainId = 137; // Polygon mainnet

export const DEFAULT_DOMAIN: EIP712Payload["domain"] = {
  name: "MyApp",
  version: "1.0.0",
  chainId: chainId,
  verifyingContract: "0xabcabcabcabcabcabcabcabcabcabcabcabcabca",
  salt: hexZeroPad(hexlify(chainId), 32),
};

export const DEFAULT_MESSAGE: Message = {
  primaryType: "MetaTx",
  payload: [
    {
      name: "from",
      value: constants.AddressZero,
      type: "address",
    },
    {
      name: "to",
      value: constants.AddressZero,
      type: "address",
    },
    {
      name: "value",
      value: (1e18).toString(),
      type: "uint256",
    },
  ],
};

export interface MessagePayloadField {
  name: string;
  type: string;
  value: string;
}

export interface Message {
  primaryType?: string;
  payload: MessagePayloadField[];
}

export type EIP712DomainField =
  | {
      name: "name";
      type: "string";
    }
  | {
      name: "version";
      type: "string";
    }
  | {
      name: "chainId";
      type: "uint256";
    }
  | {
      name: "verifyingContract";
      type: "address";
    }
  | {
      name: "salt";
      type: "bytes32";
    };

export type EIP712CustomField = {
  name: string;
  type: string;
};

export type EIP712DomainAttribute =
  | "name"
  | "version"
  | "chainId"
  | "verifyingContract"
  | "salt";

export type EIP712Payload = {
  domain: {
    name?: string;
    version?: string;
    chainId?: number | string;
    verifyingContract?: string;
    salt?: string;
  };
  types: {
    EIP712Domain: EIP712DomainField[];
    [key: string]: EIP712CustomField[];
  };
  primaryType: string;
  message: {
    [key: string]: string | number;
  };
};

export const buildPayload = (
  domain: EIP712Payload["domain"],
  message: Message
): EIP712Payload => {
  let eip712DomainType: EIP712DomainField[] = [];

  const presentDomainFields = {} as EIP712Payload["domain"];

  if (domain.name) {
    presentDomainFields["name"] = domain.name;

    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "name",
        type: "string",
      },
    ];
  }

  if (domain.version) {
    presentDomainFields["version"] = domain.version;

    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "version",
        type: "string",
      },
    ];
  }

  if (domain.chainId) {
    presentDomainFields["chainId"] = domain.chainId;

    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "chainId",
        type: "uint256",
      },
    ];
  }

  if (domain.verifyingContract) {
    presentDomainFields["verifyingContract"] = domain.verifyingContract;

    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "verifyingContract",
        type: "address",
      },
    ];
  }
  if (domain.salt) {
    presentDomainFields["salt"] = domain.salt;

    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "salt",
        type: "bytes32",
      },
    ];
  }

  let types = { EIP712Domain: eip712DomainType };

  let customTypeName = message.primaryType;
  let formattedMessage: any = {};

  if (customTypeName) {
    let customType: EIP712CustomField[] = [];

    message.payload.forEach((field: MessagePayloadField) => {
      const { name, type, value } = field;

      if (!name || !value || !type) {
        return;
      }

      let v: string | BigNumber = value;

      // Wrap in try to avoid error if not a proper BN
      try {
        if (type.includes("int")) {
          v = BigNumber.from(value);
        }
      } catch (error) {}

      formattedMessage = {
        ...formattedMessage,
        [name]: v,
      };

      customType = [
        ...customType,
        {
          name: name,
          type: type,
        },
      ];
    });

    types = {
      ...types,
      [customTypeName]: customType,
    };
  }

  return {
    domain: presentDomainFields,
    types: types,
    primaryType: customTypeName || "",
    message: formattedMessage,
  };
};

// ethersjs automatically includes the EIP712Domain type so remove it from the payload
const filteredTypes = (types: EIP712Payload["types"]) => {
  return Object.fromEntries(
    Object.entries(types).filter(([k, v]) => k !== "EIP712Domain")
  );
};

export const sign = async (
  data: EIP712Payload,
  signer: JsonRpcSigner | Wallet
): Promise<SignatureResult> => {
  try {
    const signature: string = await signer._signTypedData(
      data.domain,
      filteredTypes(data.types),
      data.message
    );

    return {
      signature,
      r: `0x${signature.slice(2, 66)}`,
      s: `0x${signature.slice(66, 130)}`,
      v: `0x${signature.slice(signature.length - 2, signature.length)}`,
    };
  } catch (e) {
    let message = "";

    if (typeof e === "string") {
      message = e;
    } else if (e instanceof Error) {
      message = e.message;
    } else {
      console.log("Unknown error type");
      message = "Unknown error";
    }

    console.log("error:", message);

    return {
      error: message,
    };
  }
};
