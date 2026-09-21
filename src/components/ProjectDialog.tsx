import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { ProjectContent } from './ProjectContent'

type ProjectDialogProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project && !dialog.open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      dialog.showModal()
      closeButtonRef.current?.focus()
    }

    if (!project && dialog.open) {
      dialog.close()
      returnFocusRef.current?.focus()
    }
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={project ? `project-dialog-${project.slug}` : undefined}
      onCancel={onClose}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          onClose()
        }
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {project && (
        <ProjectContent project={project} onClose={onClose} closeButtonRef={closeButtonRef} />
      )}
    </dialog>
  )
}
