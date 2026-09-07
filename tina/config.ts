import { defineConfig } from "tinacms";
import { branch, clientId, token, searchIndexerToken } from "./shared/env";
import { collections } from "./collections";

export default defineConfig({
  branch,
  clientId,
  token,

  search: {
    tina: {
      indexerToken: searchIndexerToken,
      stopwordLanguages: ["spa", "eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
      static: false,
    },
    accept: ["image/*"],
  },

  schema: {
    collections,
  },
});
