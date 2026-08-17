import './PageHero.css'

interface PageHeroProps {
  label: string
  title: string
  image: string
}

export function PageHero({ label, title, image }: PageHeroProps) {
  return (
    <section className="page-hero">
      <img src={image} alt="" className="page-hero__bg" fetchPriority="high" />
      <div className="page-hero__overlay" />
      <div className="container-wide page-hero__content">
        <span className="page-hero__label eyebrow">{label}</span>
        <h1 className="page-hero__title">{title}</h1>
      </div>
    </section>
  )
}
