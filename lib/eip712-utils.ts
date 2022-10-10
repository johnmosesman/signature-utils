import { BigNumber, constants } from "ethers";
import { hexlify, hexZeroPad } from "ethers/lib/utils";

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

  if (domain.name) {
    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "name",
        type: "string",
      },
    ];
  }
  if (domain.version) {
    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "version",
        type: "string",
      },
    ];
  }
  if (domain.chainId) {
    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "chainId",
        type: "uint256",
      },
    ];
  }
  if (domain.verifyingContract) {
    eip712DomainType = [
      ...eip712DomainType,
      {
        name: "verifyingContract",
        type: "address",
      },
    ];
  }
  if (domain.salt) {
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

      formattedMessage = {
        ...formattedMessage,
        [name]: type.includes("int") ? BigNumber.from(value) : value,
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
    domain: domain,
    types: types,
    primaryType: customTypeName || "",
    message: formattedMessage,
  };
};
