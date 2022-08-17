import { SplitPane } from "react-collapse-pane"

type SplitterProps = {
  children: JSX.Element[]
}
export const Splitter = ({ children }: SplitterProps) => {
  return (
    <SplitPane
      split="vertical"
      collapse={true}
      initialSizes={[1, 3]}
      resizerOptions={{
        css: {
          width: "2px",
          background: "rgba(0, 0, 0, 0.1)",
        },
        hoverCss: {
          width: "3px",
          background: "1px solid rgba(102, 194, 255, 0.5)",
        },
        grabberSize: "1rem",
      }}
    >
      {children}
    </SplitPane>
  )
}
