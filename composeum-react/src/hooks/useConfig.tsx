import { ComposeumConfig } from "../config"
import { createContext, useContext } from "react"

const ConfigContext = createContext<ComposeumConfig | null>(null)

export const useConfig = (): ComposeumConfig => {
  const config = useContext(ConfigContext)
  if (!config) {
    throw Error("Composeum context is not defined")
  }
  return config
}

type ComposeumConfigProviderProps = {
  children: JSX.Element
  config: ComposeumConfig
}
export const ComposeumConfigProvider = ({
  children,
  config,
}: ComposeumConfigProviderProps) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}
