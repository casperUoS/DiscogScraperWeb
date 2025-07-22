import { NextRequest, NextResponse } from "next/server";

const getReleasesFromUrls = async (
  userToken: string,
  urls: { key: string; label: string }[],
) => {
  const releases = [];

  for (const urlItem of urls) {
    try {
      // Extract release ID from Discogs URL
      const releaseId = extractReleaseIdFromUrl(urlItem.key);

      if (releaseId) {
        // let db = client.database();
        // const release = await db.getRelease(releaseId);

        const response = await fetch(
          `https://api.discogs.com/releases/${releaseId}`,
          {
            method: "GET",
            headers: {
              "User-Agent":
                "DiscogScraperWeb/1.0 (+https://discogsscraper.com)",
              // Accept: "application/vnd.discogs.v2.discogs+json",
              ...(userToken
                ? { Authorization: `Discogs token=${userToken}` }
                : {}),
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();

          throw new Error(
            `HTTP ${response.status}: ${errorText.substring(0, 200)}`,
          );
        }

        const release = await response.json();

        releases.push(release);
      }
      console.log("sucess");
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(releases[0].tracklist[0].artists);

  return releases;
};

const extractReleaseIdFromUrl = (url: string): number | null => {
  // Extract release ID from URLs like https://www.discogs.com/release/123456
  const match = url.match(/\/release\/(\d+)/);

  return match ? parseInt(match[1]) : null;
};

// Helper functions to match Python logic
const lettersOnly = (str: string): string => {
  return str.replace(/[^a-zA-Z]/g, "");
};

const digitsOnly = (str: string): string => {
  return str.replace(/[^0-9]/g, "");
};

const getCompany = (release: any): string => {
  try {
    let company = release.labels[0].name;

    if (company.includes("Not On Label")) {
      return "";
    }
    // Remove content within parentheses
    company = company.replace(/\(.*?\)/g, "");

    return `"${company}"`;
  } catch {
    return "";
  }
};

const getLabel = (release: any): string => {
  let company = "";

  try {
    company = `"${release.labels[0].name}"`;
    if (company.includes("Not On Label")) {
      // Extract content between first parentheses
      const match = company.match(/\((.*?)\)/);

      company = match ? match[1] : company;
    }
    // Remove content within parentheses
    company = company.replace(/\(.*?\)/g, "");
  } catch {
    company = "";
  }

  let catno = "";

  try {
    const catnumber = release.labels[0].catno;

    if (catnumber && /[a-zA-Z]/.test(catnumber)) {
      catno += "|b" + lettersOnly(catnumber).toUpperCase();
    }
    if (catnumber && /\d/.test(catnumber)) {
      catno += "|c" + digitsOnly(catnumber);
    }
  } catch {
    catno = "";
  }

  return company.toUpperCase() + catno;
};

const getLabelMatch = (release: any): string => {
  let company = "";

  try {
    company = `"${release.labels[0].name}"`;
    if (company.includes("Not On Label")) {
      // Extract content between first parentheses
      const match = company.match(/\((.*?)\)/);

      company = match ? match[1] : company;
    }
    // Remove content within parentheses
    company = company.replace(/\(.*?\)/g, "");
  } catch {
    company = "";
  }

  let catno = "";

  try {
    const catnumber = release.labels[0].catno;

    if (catnumber) {
      catno = lettersOnly(catnumber).toUpperCase();
      catno += digitsOnly(catnumber);
    }
  } catch {
    catno = "";
  }

  return company.toUpperCase().replace(/ /g, "") + catno;
};

const getDate = (release: any): string => {
  return release.year?.toString() || "[unkown]";
};

const getCountry = (release: any): string => {
  return release.country || "[unkown]";
};

const getTracks1 = (release: any): string => {
  if (parseInt(release.formats[0]["qty"]) > 1) {
    // console.log(release.tracklist);
    return (
      release.formats[0]["name"] +
      "1: " +
      release.tracklist
        .filter((track: any) => /^(1[.-]|[AB])/.test(track.position))
        .map((track: any) => {
          try {
            return release.artists_sort == "Various"
              ? track.artists.map((t: any) => t.name || "").join(" - ") +
                  " - " +
                  track.title
              : track.title;
          } catch {
            return "";
          }
        })
        .join(".- ")
    );
  } else {
    // console.log(release.tracklist)
    return release.tracklist
      .map((track: any) => {
        try {
          return release.artists_sort == "Various"
            ? track.artists.map((t: any) => t.name || "").join(" - ") +
                " - " +
                track.title
            : track.title;
        } catch {
          return "";
        }
      })
      .join(".- ");
  }
};

const getTracks2 = (release: any): string => {
  if (parseInt(release.formats[0]["qty"]) > 1) {
    return (
      release.formats[0]["name"] +
      "2: " +
      release.tracklist
        .filter((track: any) => /^(2[.-]|[CD])/.test(track.position))
        .map((track: any) => {
          try {
            return release.artists_sort == "Various"
              ? track.artists.map((t: any) => t.name || "").join(" - ") +
                  " - " +
                  track.title
              : track.title;
          } catch {
            return "";
          }
        })
        .join(".- ")
    );
  } else {
    return "";
  }
};

const getTracks3 = (release: any): string => {
  if (parseInt(release.formats[0]["qty"]) > 2) {
    return (
      release.formats[0]["name"] +
      "3: " +
      release.tracklist
        .filter((track: any) => /^(3[.-]|[EF])/.test(track.position))
        .map((track: any) => {
          try {
            return release.artists_sort == "Various"
              ? track.artists.map((t: any) => t.name || "").join(" - ") +
                  " - " +
                  track.title
              : track.title;
          } catch {
            return "";
          }
        })
        .join(".- ")
    );
  } else {
    return "";
  }
};

const getTracks4 = (release: any): string => {
  if (parseInt(release.formats[0]["qty"]) > 1) {
    return (
      release.formats[0]["name"] +
      "4: " +
      release.tracklist
        .filter((track: any) => /^(4[.-]|[GH])/.test(track.position))
        .map((track: any) => {
          try {
            return release.artists_sort == "Various"
              ? track.artists.map((t: any) => t.name || "").join(" - ") +
                  " - " +
                  track.title
              : track.title;
          } catch {
            return "";
          }
        })
        .join(".- ")
    );
  } else {
    return "";
  }
};

const getFormat = (release: any): string => {
  try {
    const format = release.formats[0];
    let result = format.qty + " ";

    if (format.name === "Vinyl") {
      result += "LP";
    } else {
      result += format.name;
    }

    if (parseInt(format.qty) > 1) {
      result += "s";
    }

    return result;
  } catch {
    return "";
  }
};

// Helper function to safely get string values
const safeString = (value: any): string => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
};

const processReleases = async (
  userToken: string,
  urls: { key: string; label: string }[],
  column: {
    key: string;
    label: string;
  }[],
) => {
  // Get releases from URLs
  const releases = await getReleasesFromUrls(userToken, urls);

  // Create CSV content
  let columnKeys = column.map((col) => col.key);
  let csvContent = columnKeys.join(",") + "\n";

  // Process each release
  for (const release of releases) {
    const row: string[] = [];

    if (columnKeys.includes("Curator 949x")) {
      row.push("");
    }
    if (columnKeys.includes("Type 949t")) {
      row.push("");
    }
    if (columnKeys.includes("Shelfmark {087}")) {
      row.push("");
    }
    if (columnKeys.includes("Barcode{023}")) {
      row.push("");
    }
    if (columnKeys.includes("Company {031}")) {
      row.push(getCompany(release));
    }
    if (columnKeys.includes("Label {032}")) {
      row.push(getLabel(release));
    }
    if (columnKeys.includes("Label Match {035}")) {
      row.push(getLabelMatch(release));
    }
    if (columnKeys.includes("Date {260}")) {
      row.push(getDate(release));
    }
    if (columnKeys.includes("Copyright {536}")) {
      row.push("");
    }
    if (columnKeys.includes("Manufacture {044}")) {
      row.push(getCountry(release));
    }
    if (columnKeys.includes("Title {499}")) {
      row.push(`"${safeString(release.title)}"`);
    }
    if (columnKeys.includes("Contributor 1 {702}")) {
      row.push("");
    }
    if (columnKeys.includes("Contributor 2 {702}")) {
      row.push("");
    }
    if (columnKeys.includes("Contents note {505}")) {
      row.push(`"${getTracks1(release)}"`);
      row.push(`"${getTracks2(release)}"`);
      row.push(`"${getTracks3(release)}"`);
      row.push(`"${getTracks4(release)}"`);
      row.push("");
    }

    // Handle Genre columns
    columnKeys.forEach((col: string) => {
      if (col.startsWith("Genre")) {
        row.push("");
      }
    });

    if (columnKeys.includes("Country {631}")) {
      row.push("");
    }
    if (columnKeys.includes("Culture {632}")) {
      row.push("");
    }
    if (columnKeys.includes("Tag {650}")) {
      row.push("");
    }
    if (columnKeys.includes("Format {310}")) {
      row.push(getFormat(release));
    }
    if (columnKeys.includes("Prod note {502}")) {
      row.push("");
    }
    if (columnKeys.includes("Doc {525}")) {
      row.push("");
    }
    if (columnKeys.includes("Copy condition {092}")) {
      row.push("B");
    }
    if (columnKeys.includes("Copy note {956}")) {
      row.push("");
    }
    if (columnKeys.includes("Acq date {959}")) {
      row.push("");
    }
    if (columnKeys.includes("Donor {548}")) {
      row.push("");
    }
    if (columnKeys.includes("Series {440}")) {
      row.push("");
    }
    if (columnKeys.includes("{312}")) {
      row.push("a");
    }
    if (columnKeys.includes("Cat {971}")) {
      row.push("");
    }

    csvContent += row.join(",") + "\n";
  }

  return csvContent;
};

export async function POST(request: NextRequest) {
  try {
    const { userToken, urls, columns } = await request.json();

    // const client = new DiscogsClient({
    //   userAgent: "DiscogsScraperWeb/1.0 +discogsscraper.com",
    //   ...(userToken !== "" ? { auth: { userToken } } : {}),
    // });

    // client.setConfig({
    //   exponentialBackoffIntervalMs: 2000,
    //   exponentialBackoffMaxRetries: 5,
    //   exponentialBackoffRate: 2.7,
    // });

    const csvData = await processReleases(userToken, urls, columns);

    return NextResponse.json({ csvData });
  } catch (error) {
    console.log("Error: ", error);

    return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
  }
}
