import type { NextPage, GetStaticProps } from "next"
import componentMap from "../components/componentMap"
import { ComposeumEditor, Page, NextJSAdapter } from "composeum-react"
import { useRouter } from "next/router"

export const getStaticProps: GetStaticProps = async () => {
  const page = await NextJSAdapter.getRootPage()
  return { props: { rootPage: page } }
}

type EditPageProps = {
  rootPage: Page
}

const EditPage: NextPage<EditPageProps> = ({ rootPage }) => {
  const router = useRouter()
  const path = (router.query.path as string) || ""
  return (
    <div>
      <ComposeumEditor
        rootPage={rootPage}
        path={path}
        componentMap={componentMap}
      />
    </div>
  )
}

export default EditPage