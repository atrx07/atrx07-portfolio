import { MagicTab } from "../../components/godui/magic-tab";
import { formatBlogTag } from "../format";
import type { BlogTag } from "../types";

export type BlogFilter = "all" | BlogTag;

type Props = {
  activeFilter: BlogFilter;
  counts: Map<BlogFilter, number>;
  onChange: (filter: BlogFilter) => void;
  tags: BlogTag[];
};

export function TagFilter({ activeFilter, counts, onChange, tags }: Props) {
  const items: Array<{ value: BlogFilter; label: string }> = [
    { value: "all", label: `all ${counts.get("all") ?? 0}` },
    ...tags.map((tag) => ({ value: tag, label: `${formatBlogTag(tag)} ${counts.get(tag) ?? 0}` })),
  ];

  return (
    <div className="notes-filter" aria-labelledby="notes-filter-label">
      <div className="notes-filter__heading">
        <p id="notes-filter-label" className="notes-label">
          FILTER BY SIGNAL
        </p>
        <p>Arrow keys move. Enter selects.</p>
      </div>
      <div className="notes-filter__scroll">
        <MagicTab
          aria-label="Filter Field Notes by tag"
          className="notes-filter__tabs"
          items={items}
          onValueChange={(value) => onChange(value as BlogFilter)}
          panelId="field-notes-results"
          rainbow={false}
          size="sm"
          value={activeFilter}
        />
      </div>
    </div>
  );
}
