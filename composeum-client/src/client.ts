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
  _cacheEnabled: boolean

  constructor(
    baseURL: string,
    options: { enableCache: boolean } = { enableCache: true }
  ) {
    this._baseURL = new URL(appendTrailingSlash(baseURL))
    this._cacheEnabled = options.enableCache
  }

  async preload(path: Path) {
    await this.loadPage(path, 100)
    return this
  }

  async getPageTree(path: Path, depth: number) {
    return this.loadPage(path, depth)
  }

  async getPage(path: Path) {
    return this.loadPage(path, 1)
  }

  async savePage(page: Page) {
    const url = new URL(`${this._baseURL}${page.path}`)
    const result = fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(page.content),
    })
    return result
  }

  get allCachedPaths(): Path[] {
    return Object.keys(this._cache)
  }

  private async loadPage(path: Path, depth: number) {
    const cleanPath = stripLeadingSlash(path)
    let page = this._cacheEnabled ? this._cache[cleanPath] : null
    if (!page) {
      const url = new URL(
        `${this._baseURL.toString()}${cleanPath}?depth=${depth}`
      )
      console.log(`ComposeumClient fetching url: ${url.toString()}`)

      const results = await fetch(url.toString())
      console.log(`Got the results: ${results.ok} status: ${results.status}`)
      const json = await results.json()
      console.log(`result json: ${json}`)
      page = toPage(json)
      if (this._cacheEnabled) {
        this.addToCache(page)
      }
    }
    return page
  }

  private addToCache(page: Page) {
    this._cache[page.path] = page
    page.children?.forEach((childPage) => this.addToCache(childPage))
  }
}
