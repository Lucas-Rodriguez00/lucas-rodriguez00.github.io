import { useState } from 'react'
import { ArrowUpRight, Github, Linkedin, Mail } from './Icons'
import { contactHref, profile } from '../data/profile'

// La interfaz no envía ni conserva información: se puede reemplazar por un formulario más adelante.
export function Contact() {
  const [copyStatus, setCopyStatus] = useState('')

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus('Correo copiado.')
    } catch {
      setCopyStatus('No se pudo copiar automáticamente. Podés seleccionar el correo que aparece arriba.')
    }
  }

  return (
    <section id="contacto" className="contact-section" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container contact-grid">
        <div>
          <p className="section-label">Conversemos</p>
          <h2 id="contact-title">¿Tenés una idea o un proceso para mejorar?</h2>
          <p className="contact-copy">Si necesitás una aplicación, una herramienta interna o una forma más simple de gestionar un proceso, contame el problema y vemos si puedo ayudarte.</p>
          <a className="button button--primary" href={contactHref}>Hablemos de tu idea <ArrowUpRight /></a>
          <p className="contact-hint">Se abre tu aplicación de correo.</p>
        </div>
        <div className="contact-details">
          <p className="section-label">Un buen punto de partida</p>
          <p>Contame qué necesitás resolver, quién lo va a usar y qué alcance imaginás. Con eso podemos empezar.</p>
          <a className="contact-email" href={`mailto:${profile.email}`}><Mail />{profile.email}</a>
          <button type="button" className="text-action" onClick={copyEmail}>Copiar correo</button>
          <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
          <div className="contact-socials">
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ArrowUpRight size={14} /></a>
            <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
