"use client";

import { Input } from "@heroui/input";
import { useState } from "react";

import SelectionBox from "@/components/selection-box";
import { DiscogButton } from "@/components/discog-button";

export default function Home() {
  const defaultColumns = [
    {
      key: "Curator 949x",
      label: "Curator",
    },
    {
      key: "Type 949t",
      label: "Type",
    },
    {
      key: "Shelfmark {087}",
      label: "Shelfmark",
    },
    {
      key: "Barcode{023}",
      label: "Barcode",
    },
    {
      key: "Company {031}",
      label: "Company",
    },
    {
      key: "Label {032}",
      label: "Label",
    },
    {
      key: "Label Match {035}",
      label: "Label Match",
    },
    {
      key: "Date {260}",
      label: "Date",
    },
    {
      key: "Copyright {536}",
      label: "Copyright",
    },
    {
      key: "Manufacture {044}",
      label: "Manufacture",
    },
    {
      key: "Title {499}",
      label: "Title",
    },
    {
      key: "Contributor 1 {702}",
      label: "Contributor 1",
    },
    {
      key: "Contents note {505}",
      label: "Contents note",
    },
    {
      key: "505-2",
      label: "505-2",
    },
    {
      key: "Genre 1 {633}",
      label: "Genre 1",
    },
    {
      key: "Country {631}",
      label: "Country",
    },
    {
      key: "Culture {632}",
      label: "Culture",
    },
    {
      key: "Tag {650}",
      label: "Tag",
    },
    {
      key: "Format {310}",
      label: "Format",
    },
    {
      key: "Prod note {502}",
      label: "Prod note",
    },
    {
      key: "Doc {525}",
      label: "Doc",
    },
    {
      key: "Copy condition {092}",
      label: "Copy condition",
    },
    {
      key: "Copy note {956}",
      label: "Copy note",
    },
    {
      key: "Acq date {959}",
      label: "Acq date",
    },
    {
      key: "Donor {548}",
      label: "Donor",
    },
    {
      key: "Series {440}",
      label: "Series",
    },
    {
      key: "{312}",
      label: "312",
    },
    {
      key: "Cat {971}",
      label: "Cat",
    },
  ];
  // const items: { key: string; label: string }[] = [];
  const [urlItems, setUrlItems] = useState<{ key: string; label: string }[]>(
    [],
  );
  const [urlInput, setUrlInput] = useState("");
  const [userToken, setUserToken] = useState("");

  // Proper undo buffer using React state
  const [backupURLs, setBackupURLs] = useState<
    { key: string; label: string }[]
  >([]);

  const [selectedColumns, setSelectedColumns] = useState(new Set<string>());
  const [selectedUrls, setSelectedUrls] = useState(new Set<string>());

  const onAdd = () => {
    setBackupURLs(urlItems); // Save current state before making changes
    if (urlInput.trim() === "") return; // Don't add empty URLs

    // Check if URL already exists
    const urlExists = urlItems.some((item) => item.key === urlInput);

    if (!urlExists) {
      // Create a new array with the new item
      const newItems = [...urlItems, { key: urlInput, label: urlInput }];

      setUrlItems(newItems);
    } else {
      alert("You entered in the same url twice, nice one");
    }
    setUrlInput("");
  };

  const onDelete = () => {
    setBackupURLs(urlItems); // Save current state before making changes
    const newItems = urlItems.filter((item) => !selectedUrls.has(item.key));

    setUrlItems(newItems);
    setSelectedUrls(new Set());
  };

  const onDeleteLast = () => {
    setBackupURLs(urlItems); // Save current state before making changes
    if (urlItems.length > 0) {
      const newItems = urlItems.slice(0, -1); // Remove last item properly

      setUrlItems(newItems);
    }
  };

  const onClear = () => {
    setBackupURLs(urlItems); // Save current state before making changes
    setUrlItems([]);
  };

  const onUndo = () => {
    setUrlItems(backupURLs); // Restore previous state
  };

  const onRun = async () => {
    // if (userToken === "") {
    //   alert("Please enter a user token");

    //   return;
    // }

    if (urlItems.length === 0) {
      alert("Please add at least one URL");

      return;
    }

    // if (selectedColumns.size === 0) {
    //   alert("Please select at least one column");

    //   return;
    // }

    try {
      const response = await fetch("/api/fetchURLs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userToken,
          urls: urlItems,
          columns: defaultColumns,
        }),
      });

      const { csvData } = await response.json();

      downloadCSV(csvData, "output.csv");
    } catch (error) {
      if (error instanceof Error) {
        alert("Error: " + error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-row items-start gap-4">
        <div className="flex flex-col w-[260px]">
          <span className="font-sans">Columns</span>
          <SelectionBox
            items={defaultColumns}
            selectedKeys={selectedColumns}
            selectionMode="multiple" // or "single" or "none"
            onSelectionChange={setSelectedColumns}
          />
          <DiscogButton className="mt-6 mr-auto ">Delete Column</DiscogButton>
          <DiscogButton className="mt-4 mr-auto ">Reset Columns</DiscogButton>
        </div>
        <div className="flex flex-col w-[1000px]">
          <span className="font-sans">URLs</span>
          <SelectionBox
            items={urlItems}
            selectedKeys={selectedUrls}
            selectionMode="multiple"
            onSelectionChange={setSelectedUrls}
          />
          <div className="flex flex-row px-2 pt-6 items-center">
            <span className="w-[130]">Enter in URL</span>
            <Input
              classNames={{
                inputWrapper:
                  "border-small border-default-300 dark:border-default-200 rounded-none",
              }}
              label="URL"
              type="url"
              value={urlInput}
              onValueChange={setUrlInput}
            />
          </div>
          <div className="flex flex-row px-2 pt-4 justify-between w-[500px]">
            <DiscogButton onPress={onAdd}>Add</DiscogButton>
            <DiscogButton onPress={onDelete}>Delete</DiscogButton>
            <DiscogButton onPress={onDeleteLast}>Delete Last</DiscogButton>
            <DiscogButton onPress={onClear}>Clear</DiscogButton>
            <DiscogButton onPress={onUndo}>Undo</DiscogButton>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start gap-4 pt-10 items-center">
        <span>Enter in your Discogs User Token (Optional)</span>
        <Input
          classNames={{
            inputWrapper:
              "border-small border-default-300 dark:border-default-200 rounded-none",
          }}
          label="User Token"
          type="password"
          value={userToken}
          onValueChange={setUserToken}
        />
        <DiscogButton onPress={onRun}>Run</DiscogButton>
      </div>
    </>
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    //   <div className="inline-block max-w-xl text-center justify-center">
    //     <span className={title()}>Make&nbsp;</span>
    //     <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
    //     <br />
    //     <span className={title()}>
    //       websites regardless of your design experience.
    //     </span>
    //     <div className={subtitle({ class: "mt-4" })}>
    //       Beautiful, fast and modern React UI library.
    //     </div>
    //   </div>

    //   <div className="flex gap-3">
    //     <Link
    //       isExternal
    //       className={buttonStyles({
    //         color: "primary",
    //         radius: "full",
    //         variant: "shadow",
    //       })}
    //       href={siteConfig.links.docs}
    //     >
    //       Documentation
    //     </Link>
    //     <Link
    //       isExternal
    //       className={buttonStyles({ variant: "bordered", radius: "full" })}
    //       href={siteConfig.links.github}
    //     >
    //       <GithubIcon size={20} />
    //       GitHub
    //     </Link>
    //   </div>

    //   <div className="mt-8">
    //     <Snippet hideCopyButton hideSymbol variant="bordered">
    //       <span>
    //         Get started by editing <Code color="primary">app/page.tsx</Code>
    //       </span>
    //     </Snippet>
    //   </div>
    // </section>
  );
}
