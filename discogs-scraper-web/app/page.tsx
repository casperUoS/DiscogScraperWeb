"use client";

import { Input } from "@heroui/input";

import SelectionBox from "@/components/selection-box";
import { DiscogButton } from "@/components/discog-button";

export default function Home() {
  const items2 = [
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

  const generateItems = (n: number) => {
    const items = [
      "Cat",
      "Dog",
      "Elephant",
      "Lion",
      "Tiger",
      "Giraffe",
      "Dolphin",
      "Penguin",
      "Zebra",
      "Shark",
      "Whale",
      "Otter",
      "Crocodile",
    ];

    const dataset = [];

    for (let i = 0; i < n; i++) {
      const item = items[i % items.length];

      dataset.push({
        key: `${item}${i}`,
        label: `${item.toLowerCase()}${i}`,
        // description: "Sample description",
      });
    }

    return dataset;
  };

  const items = generateItems(1000);

  return (
    <>
      <div className="flex flex-row items-start gap-4">
        <div className="flex flex-col w-[260px]">
          <span className="font-sans">Columns</span>
          <SelectionBox items={items2} />
          <DiscogButton className="mt-6 mr-auto ">Delete Column</DiscogButton>
          <DiscogButton className="mt-4 mr-auto ">Reset Columns</DiscogButton>
        </div>
        <div className="flex flex-col w-[1000px]">
          <span className="font-sans">URLs</span>
          <SelectionBox items={items} />
          <div className="flex flex-row px-2 pt-6 items-center">
            <span className="w-[130]">Enter in URL</span>
            <Input
              classNames={{
                inputWrapper:
                  "border-small border-default-300 dark:border-default-200 rounded-none",
              }}
              label="URL"
              type="url"
            />
          </div>
          <div className="flex flex-row px-2 pt-4 justify-between w-[400px]">
            <DiscogButton>Add</DiscogButton>
            <DiscogButton>Delete</DiscogButton>
            <DiscogButton>Delete Last</DiscogButton>
            <DiscogButton>Clear</DiscogButton>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start gap-4 pt-10 items-center">
        <span>Enter in your Discogs User Token</span>
        <Input
          classNames={{
            inputWrapper:
              "border-small border-default-300 dark:border-default-200 rounded-none",
          }}
          label="User Token"
          type="password"
        />
        <DiscogButton>Run</DiscogButton>
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
