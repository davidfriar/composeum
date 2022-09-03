import { createContext, useContext } from "react"
import { ComponentType } from "react"
import { ItemId } from "composeum-schema"

export type SlotWrapper = ComponentType<{
  itemId: ItemId
  name: string
  children: JSX.Element
}>
export type ComponentWrapper = ComponentType<{
  itemId: ItemId
  index: number
  children: JSX.Element
}>

type ComposeumContext = {
  slotWrapper?: SlotWrapper
  componentWrapper?: ComponentWrapper
}
const Context = createContext<ComposeumContext | null>(null)

export const useComposeumContext = () => {
  const context = useContext(Context)
  if (!context) throw Error("Attempt to access an uninitialised context")
  return context
}

export const useSlotWrapper = () => {
  return useComposeumContext().slotWrapper
}

export const useComponentWrapper = () => {
  return useComposeumContext().componentWrapper
}

export const ComposeumContextProvider = Context.Provider
