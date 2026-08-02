/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { BlogPostComponent } from "./blog/types";

  export const meta: unknown;
  const MdxContent: BlogPostComponent;
  export default MdxContent;
}
