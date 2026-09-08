import { defineConfig } from "tinacms";
import { branch, clientId, token, searchIndexerToken } from "./shared/env";
import { collections } from "./collections";
import { registerPublishPlugin } from "./plugins/publish-plugin";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  branch,
  clientId: isLocal ? null : clientId,
  token: isLocal ? null : token,

  cmsCallback: (cms) => {
    registerPublishPlugin(cms);
    return cms;
  },

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
