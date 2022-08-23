import { ComponentStory, ComponentMeta } from "@storybook/react"
import { Text as composeumComponent } from "../components/text"

import { Editor } from "../editor/editor"
import { useState } from "react"

const Text = composeumComponent.component
const schema = composeumComponent.schema

export default {
  title: "Text",
  component: Text,
} as ComponentMeta<typeof Text>

export const Component: ComponentStory<typeof Text> = (args) => (
  <Text {...args} />
)
Component.args = {
  text: "I am he as you are he as you are me And we are all together",
}

export const WithEditor: ComponentStory<typeof Text> = (args) => {
  const [data, setData] = useState(args)

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "50%", backgroundColor: "grey" }}>
        <Editor data={data} setData={setData} schema={schema} />
      </div>
      <div style={{ width: "50%" }}>
        <Text {...data} />
      </div>
    </div>
  )
}
WithEditor.args = {
  text: "I am he as you are he as you are me And we are all together",
}
