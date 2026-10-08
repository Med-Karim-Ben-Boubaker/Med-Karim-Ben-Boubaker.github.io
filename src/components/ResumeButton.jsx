import { resumeFilename, resumeHref } from '../content/resume'

/** Secondary pill that downloads the PDF résumé. */
export default function ResumeButton() {
  return (
    <a className="pill-button pill-button--secondary resume-button" href={resumeHref} download={resumeFilename}>
      <svg className="resume-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
      </svg>
      Download résumé
      <span className="resume-button-meta">PDF</span>
    </a>
  )
}
