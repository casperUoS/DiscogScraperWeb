import { Button, PressEvent } from "@heroui/button";
import clsx from "clsx";
import { ReactNode } from "react";

type DiscogButtonProps = {
  children: ReactNode;
  className?: string;
  onPress?: (e: PressEvent) => void;
};

export const DiscogButton = ({
  children,
  className,
  onPress,
}: DiscogButtonProps) => {
  return (
    <Button
      className={clsx(
        "bg-white text-black border-black rounded-md border-small hover:bg-black hover:text-white font-semibold",
        className,
      )}
      size="md"
      onPress={onPress}
    >
      {children}
    </Button>
  );
};
