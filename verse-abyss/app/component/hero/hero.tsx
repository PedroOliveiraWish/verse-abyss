import './hero.css'

export function Hero({ title, text, sub }: { title: string; text: string; sub: string }) {
    return (
        <section className="hero">
            <h1>{title}</h1>
            <p>
                {text}
            </p>
            <p className="hero-sub">
                {sub}
            </p>
        </section>
    )
}