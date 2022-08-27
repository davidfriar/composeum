import { ComposeumConfig, defaultConfig } from "composeum-react"
import { HomePage } from "./components/homepage"
import { Footer } from "./components/footer"
import { Navigation } from "./components/navigation"

export const config: ComposeumConfig = {
  components: [...defaultConfig.components, HomePage, Footer, Navigation],
  apiBaseUrl: process.env.COMPOSEUM_BASE_URL!,
  rootPage: process.env.COMPOSEUM_ROOT_PAGE!,
}
