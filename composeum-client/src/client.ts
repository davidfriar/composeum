import Ajv from "ajv"
import addFormats from "ajv-formats"

import { Page, PageSchema } from "composeum-schema"

export type Path = string

const appendTrailingSlash = (s: string) => {
  return s.endsWith("/") ? s : `${s}/`
}

const stripLeadingSlash = (s: string) => {
  return s.startsWith("/") ? s.slice(1) : s
}

const ajv = new Ajv()
addFormats(ajv)
const validatePage = ajv.compile(PageSchema)

const toPage = (json: unknown): Page => {
  if (!json) {
    console.error("API returned empty result")
  }
  const valid = validatePage(json)
  if (!valid) {
    console.error(
      `API did not return a valid page. ${validatePage.errors?.map(
        (e) => e.message
      )}`
    )
  }
  return json as Page
}

export class ComposeumClient {
  _cache: Record<Path, Page> = {}
  _baseURL: URL

  constructor(baseURL: string) {
    this._baseURL = new URL(appendTrailingSlash(baseURL))
  }

  async getSinglePage(path: Path) {
    return this.getPage(path, 1)
  }

  async getPages(path: Path) {
    return this.getPage(path, 100)
  }

  get allCachedPaths(): Path[] {
    return Object.keys(this._cache)
  }

  private async getPage(path: Path, depth: number) {
    const cleanPath = stripLeadingSlash(path)
    let page = this._cache[cleanPath]
    if (!page) {
      const url = new URL(
        `${this._baseURL.toString()}${cleanPath}?depth=${depth}`
      )
      const results = await fetch(url)
      const json = await results.json()
      page = toPage(json)
      this.addToCache(page)
    }
    return page
  }

  private addToCache(page: Page) {
    this._cache[page.path] = page
    page.children?.forEach((childPage) => this.addToCache(childPage))
  }
}
