import { FC } from "react";

const year = new Date().getFullYear();

type Props = {
  siteName: string;
};

export const Footer: FC<Props> = ({ siteName }) => {
  return (
    <footer className="flex justify-center items-center justify-self-stretch h-full">
      <div className="container flex justify-between text-sm px-4">
        <div>
          {siteName} &copy; {year}
        </div>
        <div>
          Povered by{" "}
          <a href="https://code.samourai.io/dojo/one-dollar-fee-estimator-js/-/tree/master/packages/estimator" target="_blank" rel="noreferrer">
            $1 Fee Estimator
          </a>
        </div>
      </div>
    </footer>
  );
};
