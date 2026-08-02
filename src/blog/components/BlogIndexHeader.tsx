type Props = {
  publishedCount: number;
};

export function BlogIndexHeader({ publishedCount }: Props) {
  return (
    <header className="notes-index-header">
      <div className="notes-index-header__identity">
        <p className="route-kicker">ATRX / FIELD NOTES</p>
        <h1 id="field-notes-title" data-route-heading tabIndex={-1}>
          FIELD
          <br />
          NOTES
        </h1>
      </div>
      <div className="notes-index-header__brief">
        <p className="notes-index-header__count" data-published-count={publishedCount}>
          {String(publishedCount).padStart(2, "0")} / PUBLIC NOTES
        </p>
        <p>
          Engineering decisions, failed assumptions, and useful discoveries from local AI, real-time
          systems, automation, and unusual browser tools.
        </p>
        <p className="notes-index-header__policy">Claims checked. Drafts stay local. Signal over volume.</p>
      </div>
    </header>
  );
}
