"use client";
import { useEffect } from "react";

// Links into the app used to look like flowplan.org/#page=…; the part after
// "#" never reaches the server, so the browser forwards them.
export function OldAppLinks({ app }: { app: string }) {
  useEffect(() => {
    if (/^#(page|inbox|settings|admin|home|tasks)\b/.test(location.hash)) location.replace(`${app}/${location.hash}`);
  }, [app]);
  return null;
}
