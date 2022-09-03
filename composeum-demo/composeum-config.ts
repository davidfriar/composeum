import { ComposeumConfig, defaultConfig } from "composeum-react"
import { HomePage } from "./components/homepage"
import { Footer } from "./components/footer"
import { Navigation } from "./components/navigation"

export const config: ComposeumConfig = {
  components: [...defaultConfig.components, HomePage, Footer, Navigation],
  apiBaseUrl: "https://ao0vwe4q3k.execute-api.eu-west-2.amazonaws.com/prod/",
  rootPage: "home.json",
}
