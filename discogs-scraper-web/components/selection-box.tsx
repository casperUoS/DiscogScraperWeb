import { Listbox, ListboxItem } from "@heroui/listbox";
import { ReactNode } from "react";
import { clsx } from "clsx";

export const ListboxWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={clsx(
      "w-full border-small px-1 py-2 border-default-300 dark:border-default-200",
      className,
    )}
  >
    {children}
  </div>
);

type SelectionBoxItem = {
  key: string;
  label: string;
};

type SelectionBoxProps = {
  items: SelectionBoxItem[];
  className?: string;
  selectedKeys?: any;
  onSelectionChange?: (keys: any) => void;
  selectionMode?: "none" | "single" | "multiple";
  maxListBoxHeight?: number;
};

export const SelectionBox = ({
  items,
  className,
  selectedKeys,
  onSelectionChange,
  selectionMode = "multiple",
  maxListBoxHeight = 400,
}: SelectionBoxProps) => (
  <ListboxWrapper className={className}>
    <Listbox
      isVirtualized
      aria-label="Actions"
      itemClasses={{
        base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
      items={items}
      label={"Select from 1000 items"}
      selectedKeys={selectedKeys}
      selectionMode={selectionMode}
      virtualization={{
        maxListboxHeight: maxListBoxHeight,
        itemHeight: 40,
      }}
      onSelectionChange={onSelectionChange}
    >
      {(item) => <ListboxItem key={item.key}>{item.label}</ListboxItem>}
    </Listbox>
  </ListboxWrapper>
);

export default SelectionBox;
