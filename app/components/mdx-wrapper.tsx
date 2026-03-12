"use client";

import { mdxComponents } from "./mdx-components";

export default function MDXWrapper({ Content }: { Content: any }) {
  // Passing the components directly to the Content component
  return <Content components={mdxComponents} />;
}