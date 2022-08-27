import { allComponents, ComposeumComponent } from "composeum-foundation"

export type ComposeumConfig = {
  components: Array<ComposeumComponent>
  apiBaseUrl: string
  rootPage: string
}

export const defaultConfig: Partial<ComposeumConfig> &
  Pick<ComposeumConfig, "components"> = {
  components: allComponents,
}

export const getComponentByName = (config: ComposeumConfig, name: string) => {
  return config.components.find((component) => component.schema.$id === name)
}
