import { FileCode2, Fingerprint, Layers3, RotateCcw, ShieldCheck } from "lucide-react";
import { useId, useState } from "react";
import { sableEvidence, sableReceipt, sableTimeline } from "../data/sable";
import { AgentStep, AgentTimeline, type StepStatus } from "./godui/agent-timeline";

type Props = { compact?: boolean; interactive?: boolean };

export function SableVisual({ compact = false, interactive = false }: Props) {
  const [checkId, setCheckId] = useState<string>("pass");
  const [laterEdit, setLaterEdit] = useState(false);
  const descriptionId = useId();
  const check = sableReceipt.checkCases.find((item) => item.id === checkId) ?? sableReceipt.checkCases[0];
  const undo = sableReceipt.undoCases[laterEdit ? "changed" : "matching"];
  const checkStatus: StepStatus = check.id === "pass" ? "success" : check.id === "blocked" ? "error" : "pending";

  return (
    <div
      className={`project-visual sable-visual ${compact ? "is-compact" : ""} ${interactive ? "is-interactive" : ""}`}
      data-visual="sable-agent-timeline"
      aria-hidden={interactive ? undefined : true}
      role={interactive ? "region" : undefined}
      aria-label={interactive ? "Sable verification and undo explorer" : undefined}
      aria-describedby={interactive ? descriptionId : undefined}
    >
      <div className="sable-identity">
        <svg className="sable-glyph" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M30 5H12L5 12v6h18v6l-7 7H5M31 12v6H13v6" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <div><b>SABLE-AI</b><span>EVERY ACTION. ACCOUNTED FOR.</span></div>
        <small>ACTIVE<br />DEVELOPMENT</small>
      </div>

      <div className="sable-dossier">
        <div className="sable-dossier-heading">
          <span><ShieldCheck size={13} aria-hidden="true" /> EXECUTION DOSSIER</span>
          <span>V2 / LOCAL CONTROLS</span>
        </div>
        <div className="sable-dossier-body">
          <div className="sable-rail">
            <div className="sable-section-label">AGENT TIMELINE <span>01—05</span></div>
            <AgentTimeline aria-label="Documented agent sequence">
              {sableTimeline.map((step, index) => (
                <AgentStep
                  key={step.id}
                  status={step.id === "checks" ? checkStatus : "success"}
                  title={step.title}
                  meta={step.id === "checks" ? check.status : step.meta}
                  last={index === sableTimeline.length - 1}
                >
                  {interactive ? <p>{step.id === "checks" ? check.detail : step.detail}</p> : undefined}
                </AgentStep>
              ))}
            </AgentTimeline>
            <div className="sable-authority"><span>MODEL REQUESTS</span><b>RUNTIME DECIDES</b></div>
          </div>

          <div className="sable-journal">
            <div className="sable-patch">
              <div className="sable-patch-heading"><FileCode2 size={13} aria-hidden="true" /><span>{sableReceipt.file}</span><b>−1 / +1</b></div>
              <pre><code><span className="sable-diff-context">{sableReceipt.signature}</span>{"\n"}<span className="sable-diff-remove">− {sableReceipt.before}</span>{"\n"}<span className="sable-diff-add">+ {sableReceipt.after}</span></code></pre>
              <div className="sable-preserved"><span>TEST INTEGRITY</span><b>UNCHANGED</b></div>
            </div>
            <div className="sable-snapshots">
              <div className="sable-section-label"><Layers3 size={12} aria-hidden="true" /> RECOVERY JOURNAL</div>
              <div className="sable-snapshot-stack" aria-hidden="true"><span>PRE-EDIT BASELINE</span><span>POST-EDIT FINGERPRINT</span></div>
              <div className="sable-fingerprint"><Fingerprint size={26} aria-hidden="true" /><span>COMPARE BEFORE RESTORE<b>{laterEdit ? "FINGERPRINT MISMATCH" : "MATCHING POST-STATE"}</b></span></div>
            </div>
          </div>
        </div>

        <div className="sable-outcome" data-outcome={check.id} aria-live={interactive ? "polite" : undefined} aria-atomic="true">
          <div className="sable-stamp"><span>{check.stamp}</span><small>{check.status}</small></div>
          <p>{interactive ? check.detail : "Checks own the verdict. Not the model."}</p>
        </div>
      </div>

      {interactive && (
        <fieldset className="sable-check-controls">
          <legend>What if a required check…</legend>
          {sableReceipt.checkCases.map((item) => (
            <button key={item.id} type="button" aria-pressed={item.id === checkId} onClick={() => setCheckId(item.id)}>{item.label}</button>
          ))}
        </fieldset>
      )}

      <div className="sable-undo" data-conflict={laterEdit}>
        {interactive && <button type="button" className="sable-edit-toggle" aria-pressed={laterEdit} onClick={() => setLaterEdit((current) => !current)}>
          <Fingerprint size={16} aria-hidden="true" /> Later user edit <span>{laterEdit ? "PRESENT" : "ABSENT"}</span>
        </button>}
        <div aria-live={interactive ? "polite" : undefined} aria-atomic="true">
          <strong><RotateCcw size={14} aria-hidden="true" /> {undo.status}</strong>
          {interactive && <p>{undo.detail}</p>}
        </div>
      </div>

      <div className="sable-caption">
        <p id={descriptionId}>{interactive ? "Interactive explanation. No code executes." : "DOCUMENTED FIXTURE / EXPECTED BEHAVIOR"}</p>
        {interactive ? <a href={sableEvidence.docsUrl} target="_blank" rel="noreferrer">Read the source evidence ↗</a> : <span>{sableReceipt.fixture}</span>}
      </div>
    </div>
  );
}
