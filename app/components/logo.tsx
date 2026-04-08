import type { FC } from "react";

export const Logo: FC<{ size: number }> = ({ size }) => {
	return <img src="/logo.svg" alt="" width={size} height={size} />;
};
