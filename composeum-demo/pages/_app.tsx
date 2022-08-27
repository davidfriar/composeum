import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ComposeumQueryClientProvider } from "composeum-react"

function MyApp({ Component, pageProps }: AppProps) {
  console.log("In app")
  return (
    <ComposeumQueryClientProvider dehydratedState={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </ComposeumQueryClientProvider>
  )
}

export default MyApp
