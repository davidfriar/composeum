import type { NextPage } from "next"
import { Composeum, Page, NextJSAdapter } from "composeum-react"
import { config } from "../composeum-config"

export const getStaticPaths = NextJSAdapter.getStaticPaths

export const getStaticProps = NextJSAdapter.getStaticProps

type HomePageProps = {
  composeumPage: Page
}

const ComposeumPage: NextPage<HomePageProps> = ({ composeumPage }) => {
  return (
    <div>
      <Composeum content={composeumPage.content} config={config} />
    </div>
  )
}

export default ComposeumPage
