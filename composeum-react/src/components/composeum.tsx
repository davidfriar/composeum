import type { Item, Slots, Slot, ItemId } from "composeum-schema"
import { getComponentByName } from "../config"
import {
  useSlotWrapper,
  useComponentWrapper,
  ComposeumContextProvider,
} from "../hooks/useComposeumContext"
import { useConfig } from "../hooks/useConfig"
import { SlotWrapper, ComponentWrapper } from "../hooks/useComposeumContext"
export { SlotWrapper, ComponentWrapper }

const DefaultSlotWrapper: SlotWrapper = ({ children }) => <>{children}</>
const DefaultComponentWrapper: ComponentWrapper = ({ children }) => (
  <>{children}</>
)

type ComposeumProps = {
  content: Item
  slotWrapper?: SlotWrapper
  componentWrapper?: ComponentWrapper
}

export const Composeum = ({
  content,
  slotWrapper,
  componentWrapper,
}: ComposeumProps) => {
  return (
    <ComposeumContextProvider value={{ slotWrapper, componentWrapper }}>
      <Container item={content} isRoot={true} />
    </ComposeumContextProvider>
  )
}

type ContainerProps = {
  item: Item
  index?: number
  isRoot?: boolean
}

export const Container = ({
  item,
  index = 0,
  isRoot = false,
}: ContainerProps) => {
  const Component = getComponentByName(
    useConfig(),
    item.componentType
  )?.component
  if (!Component) {
    throw new Error(`Component not found: ${item.componentType}`)
  }

  const renderSlots = (slots: Slots, itemId: ItemId) => {
    const Wrapper = useSlotWrapper() ?? DefaultSlotWrapper
    return Object.fromEntries(
      Object.entries(slots).map(([name, value]) => {
        return [
          name,
          <Wrapper name={name} itemId={itemId}>
            <Slot name={name} slot={value} />
          </Wrapper>,
        ]
      })
    )
  }

  const slots = item.slots ? renderSlots(item.slots, item.itemId) : {}
  const component = <Component {...item.properties} slots={slots} />
  const Wrapper = useComponentWrapper() ?? DefaultComponentWrapper
  return isRoot ? (
    component
  ) : (
    <Wrapper itemId={item.itemId} index={index}>
      {component}
    </Wrapper>
  )
}

type SlotProps = {
  name: string
  slot: Slot
}
const Slot = ({ name, slot }: SlotProps) => {
  return (
    <div className={`slot-${name}`}>
      {slot.map((item, index) => (
        <Container key={index} item={item} index={index} />
      ))}
    </div>
  )
}
