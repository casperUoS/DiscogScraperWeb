import { Button, PressEvent } from "@heroui/button";
import clsx from "clsx";
import { ReactNode } from "react";

type DiscogButtonProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  onPress?: (e: PressEvent) => void;
};

export const DiscogButton = ({
  children,
  className,
  color = "default",
  onPress,
}: DiscogButtonProps) => {
  return (
    <Button
      className={
        color == "primary"
          ? clsx(
              "bg-blue-600 text-white rounded-md border-small hover:bg-blue-1200 hover:text-white font-semibold",
              className,
            )
          : clsx(
              "bg-white text-black border-black rounded-md border-small hover:bg-black hover:text-white font-semibold",
              className,
            )
      }
      size="md"
      onPress={onPress}
    >
      {children}
    </Button>
  );
};
