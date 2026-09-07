export const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ??
  process.env.GITHUB_BRANCH ??
  process.env.VERCEL_GIT_COMMIT_REF ??
  process.env.HEAD ??
  "main";

export const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? process.env.TINA_CLIENT_ID ?? null;

export const token = process.env.TINA_TOKEN ?? null;

export const searchIndexerToken = process.env.TINA_SEARCH_TOKEN;
