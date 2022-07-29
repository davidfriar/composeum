

type HomePageProps = {
  slots:{
    header: React.ReactNode
    main: React.ReactNode
    sidebar: React.ReactNode
    footer: React.ReactNode
  }
}

export const HomePage = ({slots:{header, main, sidebar, footer}}:HomePageProps) => {
  return (
    <div>
      I am the home page
      <header>{header}</header>
      <div className="main">{main}</div>
      <aside>{sidebar}</aside>
      <footer>{footer}</footer>
    </div>
  )
}



