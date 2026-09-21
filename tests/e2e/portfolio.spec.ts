import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import process from 'node:process'
import { mkdir } from 'node:fs/promises'
import { projects } from '../../src/data/projects'

for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  test(`navegación, contacto y accesibilidad a ${viewport.width}px`, async ({ page, context }) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto('/')
    await expect(page).toHaveTitle('Lucas Rodríguez · Desarrollo de software')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Construyo software')
    await expect(page.locator('#experiencia')).toContainText('Actualmente participo')
    const murfiSite = page.locator('#experiencia').getByRole('link', { name: 'Visitar sitio de Murfi' })
    await expect(murfiSite).toHaveAttribute('href', 'https://murfi.com.ar/')
    await expect(murfiSite).toHaveAttribute('target', '_blank')
    const murfiLogo = page.locator('.company-logo img')
    await expect(murfiLogo).toHaveAttribute('src', '/images/murfi-logo.webp')
    expect((await page.request.get('/images/murfi-logo.webp')).status()).toBe(200)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused()
    if (viewport.width < 681) {
      await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeHidden()
      await page.getByRole('button', { name: 'Abrir menú' }).click()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeFocused()
      await page.getByRole('button', { name: 'Abrir menú' }).click()
      await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Contacto' }).click()
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
      await expect(page.locator('#contacto')).toBeFocused()
    }
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.getByRole('button', { name: 'Copiar correo' }).click()
    await expect(page.getByRole('status')).toHaveText('Correo copiado.')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('lucasrodri017@gmail.com')
    await expect(page.locator('#contacto').getByRole('link', { name: 'Hablemos de tu idea' })).toHaveAttribute('href', /^mailto:lucasrodri017@gmail.com/)
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
    const quickView = page.getByRole('button', { name: 'Vista rápida de Compras y stock doméstico' })
    await quickView.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cerrar caso de estudio' })).toBeFocused()
    await expect(page.getByRole('dialog').getByRole('link', { name: 'Abrir caso completo' })).toBeVisible()
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Desafíos técnicos' })).toHaveCount(0)
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
    await page.keyboard.press('Escape')
    await expect(quickView).toBeFocused()
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false)
    if (process.env.QA_OUTPUT_DIR) {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await mkdir(process.env.QA_OUTPUT_DIR, { recursive: true })
      await page.goto('/#contacto')
      await page.screenshot({ path: `${process.env.QA_OUTPUT_DIR}/contacto-${viewport.width}.png` })
      await page.goto('/')
      await page.screenshot({ path: `${process.env.QA_OUTPUT_DIR}/inicio-${viewport.width}.png` })
    }
    expect(errors).toEqual([])
  })
}

test('casos propios, imágenes y metadata', async ({ page, request }) => {
  for (const project of projects) {
    const path = `/proyectos/${project.slug}/`
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.name)
    await expect(page).toHaveTitle(`${project.name} · Lucas Rodríguez`)
    if (project.slug === 'radar-estacionamiento') {
      await expect(page.locator('.project-media__item--main img')).toHaveAttribute('src', '/images/projects/radar/autito-armado.webp')
      await expect(page.locator('.project-media img[src="/images/projects/radar/pcb-captura-8.webp"]')).toHaveCount(1)
    }
    if (project.slug === 'compras-stock-domestico') {
      await expect(page.getByRole('heading', { name: 'Aplicación Android' })).toBeVisible()
      await expect(page.locator('.capture-notice')).toContainText('Interfaz web actual')
      await expect(page.locator('.capture-notice')).toContainText('Datos ficticios')
    }
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
    for (const media of [project.mainImage, ...project.gallery].filter(Boolean)) {
      const asset = await request.get(media!.src)
      expect(asset.status()).toBe(200)
      expect(asset.headers()['content-type']).toContain('image/webp')
    }
    await page.setViewportSize({ width: 320, height: 800 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false)
    await page.setViewportSize({ width: 1280, height: 900 })
  }
})

test('contenido y contacto disponibles sin JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(`${process.env.QA_BASE_URL ?? 'http://127.0.0.1:4174'}/`)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Construyo software')
  await page.getByRole('link', { name: 'Explorar el caso' }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Compras y stock doméstico')
  await expect(page.getByRole('heading', { name: 'Un producto, tres frentes de trabajo' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Contenido del caso' }).getByRole('link', { name: 'Capturas' })).toHaveAttribute('href', '#compras-stock-domestico-imagenes')
  await page.getByRole('navigation', { name: 'Seguir explorando' }).getByRole('link', { name: 'Siguiente proyecto CIDCom' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('CIDCom')
  await context.close()
})
