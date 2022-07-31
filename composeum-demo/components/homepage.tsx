import styles from "./homepage.module.css"

type HomePageProps = {
  slots: {
    header: React.ReactNode
    main: React.ReactNode
    sidebar: React.ReactNode
    footer: React.ReactNode
  }
}

export const HomePage = ({
  slots: { header, main, sidebar, footer },
}: HomePageProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>{header}</header>
      <main className={styles.main}>{main}</main>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <footer className={styles.footer}>{footer}</footer>
    </div>
  )
}
