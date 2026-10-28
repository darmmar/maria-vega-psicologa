/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    tinaEdit?: boolean;
  }
}

declare module "*.astro" {
  const component: any;
  export default component;
}
