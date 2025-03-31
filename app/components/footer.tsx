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
          Powered by{" "}
          <a href="https://github.com/Dojo-Open-Source-Project/one-dollar-fee-estimator" target="_blank" rel="noreferrer">
            $1 Fee Estimator
          </a>
        </div>
      </div>
    </footer>
  );
};
