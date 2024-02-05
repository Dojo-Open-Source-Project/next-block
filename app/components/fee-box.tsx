import type { FC } from "react";
import type { FeeRates } from "@samouraiwallet/one-dollar-fee-estimator";

type Props = {
  label: string;
  target: keyof FeeRates;
  fees: FeeRates;
};

export const FeeBox: FC<Props> = ({ label, target, fees }) => {
  return (
    <div key={target} className="fee-box">
      <div className="font-bold">{label}</div>
      <div className="text-xs font-thin mb-2">{Number(target) * 100}%</div>
      <div className="text-lg font-thin">{fees[target]} sat/vByte</div>
    </div>
  );
};
