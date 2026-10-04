import { test } from "node:test";
import assert from "node:assert/strict";
import { appUrl, docsUrl } from "../lib/links";
import { pickLocale } from "../lib/i18n";

test("links point to flowplan.org unless configured", () => {
  delete process.env.APP_URL;
  assert.equal(appUrl(), "https://app.flowplan.org");
  process.env.DOCS_URL = "https://docs.example.test/";
  assert.equal(docsUrl(), "https://docs.example.test");
});

test("the language: the reader's choice first, then the browser", () => {
  assert.equal(pickLocale("en", "de-DE"), "en");
  assert.equal(pickLocale(undefined, "de-AT,de;q=0.9"), "de");
  assert.equal(pickLocale(undefined, "fr-FR"), "en");
});
