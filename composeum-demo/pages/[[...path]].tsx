import type { NextPage } from "next"
import componentMap from "../components/componentMap"
import { Composeum, Page, NextJSAdapter } from "composeum-react"

export const getStaticPaths = NextJSAdapter.getStaticPaths

export const getStaticProps = NextJSAdapter.getStaticProps

type HomePageProps = {
  composeumPage: Page
}

const ComposeumPage: NextPage<HomePageProps> = ({ composeumPage }) => {
  return (
    <div>
      <Composeum content={composeumPage.content} componentMap={componentMap} />
    </div>
  )
}

export default ComposeumPage
