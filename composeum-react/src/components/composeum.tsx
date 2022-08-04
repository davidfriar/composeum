import { Item, Slots, Slot, ItemId } from "composeum-schema"

import { ReactComponentMap } from "../types/componentMap"

type Mode = "edit" | "publish"

type ComposeumProps = {
  componentMap: ReactComponentMap
  content: Item
  mode?: Mode
}

export const Composeum = ({ content, componentMap, mode }: ComposeumProps) => {
  console.log(`In composeum component. content: ${JSON.stringify(content)}`)
  return <Container item={content} componentMap={componentMap} mode={mode} />
}

type ContainerProps = {
  item: Item
  componentMap: ReactComponentMap
  mode?: Mode
}

export const Container = ({
  item,
  componentMap,
  mode = "publish",
}: ContainerProps) => {
  const Component = componentMap[item.componentType]

  const renderSlot = (name: string, slot: Slot) => {
    return (
      <div className={`slot-${name}`}>
        {slot.map((item, index) => (
          <Container
            mode={mode}
            key={index}
            item={item}
            componentMap={componentMap}
          />
        ))}
      </div>
    )
  }

  const renderSlots = (slots: Slots) => {
    return Object.fromEntries(
      Object.entries(slots).map(([name, value]) => [
        name,
        renderSlot(name, value),
      ])
    )
  }

  const slots = item.slots ? renderSlots(item.slots) : {}

  return (
    <Wrapper itemId={item.itemId} mode={mode}>
      <Component {...item.properties} slots={slots} />
    </Wrapper>
  )
}

type WrapperProps = {
  itemId: ItemId
  mode: Mode
  children: JSX.Element
}
const Wrapper = ({ itemId, mode, children }: WrapperProps) => {
  switch (mode) {
    case "publish":
      return <>{children}</>
    case "edit":
      return (
        <div className="composeum-container" data-item-id={itemId}>
          {children}
        </div>
      )
  }
}
