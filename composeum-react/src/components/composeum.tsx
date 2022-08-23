import { Item, Slots, Slot as TSlot, ItemId } from "composeum-schema"
import { ComponentWrapper } from "./editor/componentWrapper"
import { SlotWrapper } from "./editor/slotWrapper"
import { getComponentByName, ComposeumConfig } from "../config"

type ComposeumProps = {
  config: ComposeumConfig
  content: Item
}
export const Composeum = ({ content, config }: ComposeumProps) => {
  return <Container item={content} config={config} isRoot={true} />
}

type ContainerProps = {
  item: Item
  index?: number
  config: ComposeumConfig
  isRoot?: boolean
}

export const Container = ({
  item,
  index = 0,
  config,
  isRoot = false,
}: ContainerProps) => {
  const Component = getComponentByName(config, item.componentType)?.component
  if (!Component) {
    throw new Error(`Component not found: ${item.componentType}`)
  }

  const renderSlots = (slots: Slots, itemId: ItemId) => {
    return Object.fromEntries(
      Object.entries(slots).map(([name, value]) => {
        return [
          name,
          <SlotWrapper name={name} itemId={itemId}>
            <Slot name={name} slot={value} config={config} />
          </SlotWrapper>,
        ]
      })
    )
  }

  const slots = item.slots ? renderSlots(item.slots, item.itemId) : {}
  const component = <Component {...item.properties} slots={slots} />
  return isRoot ? (
    component
  ) : (
    <ComponentWrapper itemId={item.itemId} index={index}>
      {component}
    </ComponentWrapper>
  )
}

type SlotProps = {
  name: string
  slot: TSlot
  config: ComposeumConfig
}
const Slot = ({ name, slot, config }: SlotProps) => {
  return (
    <div className={`slot-${name}`}>
      {slot.map((item, index) => (
        <Container key={index} item={item} index={index} config={config} />
      ))}
    </div>
  )
}
