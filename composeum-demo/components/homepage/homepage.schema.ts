import { ComposeumComponentSchema } from "composeum-react"
const schema: ComposeumComponentSchema = {
  $id: "https://schemas.composeum.io/demo/homepage",
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    title: {
      title: "Title",
      type: "string",
      description: "The title of the page",
    },
  },
  additionalProperties: false,
  required: ["title"],
}
export default schema
