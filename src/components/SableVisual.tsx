import { FileCheck2, Fingerprint, RotateCcw } from "lucide-react";
import { useId, useState } from "react";
import { sableEvidence, sableReceipt } from "../data/sable";

type Props = { compact?: boolean; interactive?: boolean };

export function SableVisual({ compact = false, interactive = false }: Props) {
  const [checkId, setCheckId] = useState<string>("pass");
  const [laterEdit, setLaterEdit] = useState(false);
  const descriptionId = useId();
  const check = sableReceipt.checkCases.find((item) => item.id === checkId) ?? sableReceipt.checkCases[0];
  const undo = sableReceipt.undoCases[laterEdit ? "changed" : "matching"];

  return (
    <div
      className={`project-visual sable-visual ${compact ? "is-compact" : ""} ${interactive ? "is-interactive" : ""}`}
      data-visual="sable-change-receipt"
      aria-hidden={interactive ? undefined : true}
      role={interactive ? "region" : undefined}
      aria-label={interactive ? "Sable verification and undo explorer" : undefined}
      aria-describedby={interactive ? descriptionId : undefined}
    >
      <div className="sable-identity">
        <svg className="sable-glyph" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M30 5H12L5 12v6h18v6l-7 7H5M31 12v6H13v6" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <div><b>SABLE-AI</b><span>THE CHANGE HAS A PAPER TRAIL.</span></div>
        <small>V2<br />COMPLETE</small>
      </div>

      <div className="sable-paper">
        <div className="sable-paper-heading">
          <span>CHANGE RECEIPT</span>
          <FileCheck2 size={18} aria-hidden="true" />
        </div>
        <div className="sable-diff">
          <div><span>{sableReceipt.file}</span><b>−1 / +1</b></div>
          <pre><code><span className="sable-diff-context">{sableReceipt.signature}</span>{"\n"}<span className="sable-diff-remove">− {sableReceipt.before}</span>{"\n"}<span className="sable-diff-add">+ {sableReceipt.after}</span></code></pre>
        </div>
        <div className="sable-preserved">
          <span>TEST PRESERVED</span><code>{sableReceipt.preserved}</code>
        </div>

        {interactive && (
          <fieldset className="sable-check-controls">
            <legend>What if a required check…</legend>
            {sableReceipt.checkCases.map((item) => (
              <button key={item.id} type="button" aria-pressed={item.id === checkId} onClick={() => setCheckId(item.id)}>
                {item.label}
              </button>
            ))}
          </fieldset>
        )}

        <div className="sable-outcome" data-outcome={check.id} aria-live={interactive ? "polite" : undefined} aria-atomic="true">
          <div key={check.id} className="sable-stamp"><span>{check.stamp}</span><small>{check.status}</small></div>
          <p>{interactive ? check.detail : "Required checks own the verdict. The model cannot declare a pass."}</p>
        </div>

        <div className="sable-undo" data-conflict={laterEdit}>
          {interactive ? (
            <button type="button" className="sable-edit-toggle" aria-pressed={laterEdit} onClick={() => setLaterEdit((current) => !current)}>
              <Fingerprint size={16} aria-hidden="true" />
              Later user edit <span>{laterEdit ? "PRESENT" : "ABSENT"}</span>
            </button>
          ) : <span className="sable-undo-label"><Fingerprint size={16} /> FINGERPRINT-AWARE UNDO</span>}
          <div aria-live={interactive ? "polite" : undefined} aria-atomic="true">
            <strong><RotateCcw size={14} aria-hidden="true" /> {undo.status}</strong>
            {interactive && <p>{undo.detail}</p>}
          </div>
        </div>
        <div className="sable-paper-edge" aria-hidden="true" />
      </div>

      <div className="sable-caption">
        <p id={descriptionId}>{interactive ? "Interactive explanation. No code executes." : "DOCUMENTED FIXTURE / EXPECTED BEHAVIOR"}</p>
        {interactive ? <a href={sableEvidence.docsUrl} target="_blank" rel="noreferrer">Read the source evidence ↗</a> : <span>{sableReceipt.fixture}</span>}
      </div>
    </div>
  );
}
