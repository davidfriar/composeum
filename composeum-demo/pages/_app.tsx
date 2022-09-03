import "../styles/globals.css"
import type { AppProps } from "next/app"
import { NextJSAdapter } from "composeum-react"
import { config } from "../composeum-config"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextJSAdapter.Provider
      config={config}
      dehydratedState={pageProps.dehydratedState}
    >
      <Component {...pageProps} />
    </NextJSAdapter.Provider>
  )
}

export default MyApp
