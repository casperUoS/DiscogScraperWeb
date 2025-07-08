"use client";

import SelectionBox from "@/components/selection-box";

export default function Home() {
  const items2 = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
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
          <SelectionBox items={items} />
        </div>
        <div className="flex flex-col w-[1000px]">
          <span className="font-sans">URLs</span>
          <SelectionBox items={items2} />
        </div>
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
