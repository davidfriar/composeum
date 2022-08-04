import { ComposeumClient } from "composeum-client"
import { ParsedUrlQuery } from "querystring"

const stripFileExtension = (s: string) => {
  return s.replace(/\.[^\/]*$/, "")
}

const appendFileExtension = (s: string) => {
  return `${s}.json`
}

type StaticPropsInput = {
  params: ParsedUrlQuery
}

let client: ComposeumClient | null = null

console.log("Loading NextJSAdapter module")

const getClient = async (): Promise<ComposeumClient> => {
  if (!client) {
    console.log("Initialising Composeum client")
    const baseURL = process.env.COMPOSEUM_BASE_URL
    const rootPage = process.env.COMPOSEUM_ROOT_PAGE
    if (!baseURL) {
      throw new Error("Missing environment variable: COMPOSEUM_BASE_URL")
    }
    if (!rootPage) {
      throw new Error("Missing environment variable: COMPOSEUM_ROOT_PAGE")
    }
    client = await new ComposeumClient(baseURL).preload(rootPage)
  }
  return client
}

const getStaticPaths = async () => {
  console.log(`getStaticPaths. client: ${client} `)
  const paths = (await getClient()).allCachedPaths.map((path: string) => {
    const pagePath = stripFileExtension(path).split("/")
    return {
      params: { path: pagePath },
    }
  })
  return {
    paths: paths,
    fallback: false,
  }
}

const getStaticProps = async ({ params: path }: StaticPropsInput) => {
  console.log(`getStaticProps. client: ${client} `)
  const composeumPath = appendFileExtension((path?.path as string[]).join("/"))
  const composeumPage = await (await getClient()).getPage(composeumPath)
  console.log(`(((((((((( Page: ${JSON.stringify(composeumPage)}`)
  return {
    props: { composeumPage },
  }
}

export const NextJSAdapter = {
  getStaticProps,
  getStaticPaths,
}
