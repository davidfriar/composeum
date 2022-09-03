import type { NextPage } from "next"
import { ComposeumEditor, NextJSAdapter } from "composeum-react"
import { useRouter } from "next/router"
import { config } from "../composeum-config"

export const getStaticProps = NextJSAdapter.getStaticPropsForEditor(config)

const EditPage: NextPage = () => {
  const router = useRouter()
  const path = (router.query.path as string) || config.rootPage
  return (
    <div>
      <ComposeumEditor path={path} />
    </div>
  )
}

export default EditPage
