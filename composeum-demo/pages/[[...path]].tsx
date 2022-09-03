import type { NextPage } from "next"
import { Composeum, NextJSAdapter } from "composeum-react"
import { config } from "../composeum-config"
import { usePage } from "composeum-react"

export const getStaticPaths = NextJSAdapter.getStaticPathsForPages(config)

export const getStaticProps = NextJSAdapter.getStaticPropsForPage(config)

type HomePageProps = {
  path: string
}
const ComposeumPage: NextPage<HomePageProps> = ({ path }) => {
  const { error, data } = usePage(path)

  if (error) {
    return <div>Problem fetching page: {JSON.stringify(error)}</div>
  }
  return (
    <div>
      <Composeum content={data?.content!} />
    </div>
  )
}

export default ComposeumPage
