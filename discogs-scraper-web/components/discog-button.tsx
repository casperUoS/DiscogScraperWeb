import { Button } from "@heroui/button";
import clsx from "clsx";
import { ReactNode } from "react";

type DiscogButtonProps = {
  children: ReactNode;
  className?: string;
};

export const DiscogButton = ({ children, className }: DiscogButtonProps) => {
  return (
    <Button
      className={clsx(
        "bg-white text-black border-black rounded-md border-small hover:bg-black hover:text-white font-semibold",
        className,
      )}
      size="md"
    >
      {children}
    </Button>
  );
};
