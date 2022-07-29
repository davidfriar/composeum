import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import componentMap from "../components/componentMap"
import { GetStaticPaths, GetStaticProps } from "next"
import { ComposeumClient, Page } from "composeum-client"
import { Composeum } from "composeum-react"

const composeum = new ComposeumClient(process.env.COMPOSEUM_BASE_URL!)

export const getStaticPaths: GetStaticPaths = async () => {
  await composeum.getPages("home.json")
  const paths = composeum.allCachedPaths.map((path) => ({
    params: { path: path.split("/") },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params: path }) => {
  const composeumPath = (path?.path as string[]).join("/")
  const composeumPage = await composeum.getSinglePage(composeumPath)
  return {
    props: { composeumPage },
  }
}

type HomePageProps = {
  composeumPage: Page
}

const Home: NextPage<HomePageProps> = ({ composeumPage }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Composeum content={composeumPage.content} componentMap={componentMap} />
      <div>Path= {JSON.stringify(composeumPage)}</div>
    </div>
  )
}

export default Home
