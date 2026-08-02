import type { ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "./components/CodeBlock";
import type { MdxComponentMap } from "./types";

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      {...props}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    />
  );
}

function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="article-table-region" role="region" aria-label="Scrollable technical table" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

export const mdxComponents: MdxComponentMap = {
  a: MdxLink,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => <blockquote {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => <code {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,
  hr: (props: ComponentPropsWithoutRef<"hr">) => <hr {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  pre: CodeBlock,
  table: MdxTable,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
};
