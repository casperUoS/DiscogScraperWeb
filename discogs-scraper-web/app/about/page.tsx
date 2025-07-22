import clsx from "clsx";

import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={clsx(title(), "font-oswald")}>About</h1>
      <p className="font-sans p-5">
        The aim of Discogs Scraper is to provide a platform for data archivists
        to archive data from the discogs database. This website is currenlty in
        beta, and is incomplete. In it&apos;s current state, this website will
        only be useful to a small select number of archivest
      </p>
      <ul className="font-sans">
        Upcoming features include:
        <li>- Customisable columns</li>
        <li>- OAuth support</li>
        <li>- Preview features</li>
      </ul>
    </div>
  );
}
