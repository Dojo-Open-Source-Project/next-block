import { FC } from "react";

import { Logo } from "~/logo";

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-center border-b border-omg border-opacity-5 w-full pb-3">
      <Logo size={60} />
    </header>
  );
};
