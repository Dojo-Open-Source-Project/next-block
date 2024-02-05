import { FC } from "react";

export const Links: FC = () => {
  return (
    <div className="text-gray-500">
      <a href="https://samouraiwallet.com" target="_blank" rel="noreferrer">
        Samourai Wallet
      </a>{" "}
      |{" "}
      <a href="https://sentinel.watch" target="_blank" rel="noreferrer">
        Sentinel
      </a>{" "}
      |{" "}
      <a href="https://oxt.me" target="_blank" rel="noreferrer">
        OXT
      </a>{" "}
      |{" "}
      <a href="https://paynym.is" target="_blank" rel="noreferrer">
        Paynym.is
      </a>
    </div>
  );
};
