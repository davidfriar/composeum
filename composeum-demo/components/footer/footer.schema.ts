import { ComposeumComponentSchema } from "composeum-react"
const schema: ComposeumComponentSchema = {
  $id: "https://schemas.composeum.io/demo/footer",
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    text: {
      title: "Text",
      type: "string",
      description: "This is the text",
    },
  },
  additionalProperties: false,
  required: ["text"],
}
export default schema
