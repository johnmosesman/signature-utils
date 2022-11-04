export const prettyAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const errorToString = (e: unknown): string => {
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

  return message;
};
