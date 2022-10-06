import { useEffect, useState } from "react";
import {
  buildPayload,
  type Message,
  type EIP712Payload,
} from "../eip712-utils";

export const usePayload = (
  domain: EIP712Payload["domain"],
  message: Message
) => {
  const [payload, setPayload] = useState<EIP712Payload>();

  useEffect(() => {
    const p = buildPayload(domain, message);
    setPayload(p);
  }, [domain, message]);

  return payload;
};
