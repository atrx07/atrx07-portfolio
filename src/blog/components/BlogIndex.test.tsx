import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { BlogPostMeta, BlogPostRecord } from "../types";
import { BlogIndex } from "./BlogIndex";

function record(slug: string, overrides: Partial<BlogPostMeta> = {}): BlogPostRecord {
  const meta: BlogPostMeta = {
    slug,
    title: `Note ${slug}`,
    description: `Verified description for ${slug}.`,
    publishedAt: "2026-07-01",
    status: "published",
    tags: ["testing"],
    ...overrides,
  };
  return {
    meta,
    sourcePath: `./posts/${slug}.mdx`,
    load: async () => ({ default: () => null, meta }),
  };
}

describe("Field Notes index", () => {
  it("renders the honest zero-publication state without filter controls", () => {
    render(
      <MemoryRouter>
        <BlogIndex posts={[]} tags={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText("00 / PUBLIC NOTES")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /workbench is active/i })).toBeInTheDocument();
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("renders a real featured record and filters chronological rows with keyboard-aware tabs", async () => {
    const user = userEvent.setup();
    const local = record("local-runtime", {
      featured: true,
      publishedAt: "2026-08-01",
      tags: ["local-ai", "architecture"],
    });
    const realtime = record("realtime-room", {
      publishedAt: "2026-07-20",
      status: "archived",
      tags: ["real-time", "web"],
    });

    const view = render(
      <MemoryRouter>
        <BlogIndex
          featured={local}
          posts={[local, realtime]}
          tags={["architecture", "local-ai", "real-time", "web"]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("02 / PUBLIC NOTES")).toBeInTheDocument();
    expect(screen.getByText("PRIMARY TRANSMISSION")).toBeInTheDocument();
    const realtimeTab = screen.getByRole("tab", { name: "real time 1" });
    expect(realtimeTab).toHaveAttribute("aria-controls", "field-notes-results");

    await user.click(realtimeTab);

    expect(realtimeTab).toHaveAttribute("aria-selected", "true");
    expect(realtimeTab).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Note realtime-room");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("archived");
    expect(screen.getByRole("tabpanel")).not.toHaveTextContent("Note local-runtime");

    view.rerender(
      <MemoryRouter>
        <BlogIndex featured={local} posts={[local]} tags={["local-ai", "real-time"]} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "No notes carry this tag yet." })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset filter" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Note local-runtime");
  });
});
