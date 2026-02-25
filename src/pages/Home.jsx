import { Link } from 'react-router-dom';
import { FaTruck, FaCreditCard, FaStar, FaArrowRight, FaSeedling, FaHeart } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { IMAGES, TESTIMONIALS } from '../data/products';

export default function Home() {
  const { getFeatured } = useApp();
  const featured = getFeatured();

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(46,125,50,0.82) 0%, rgba(129,199,132,0.65) 50%, rgba(216,27,96,0.45) 100%), url(${IMAGES.hero})` }}>
        <div className="hero-content">
          <span className="hero-tag"><img src="/iconflor.jpg" alt="" className="hero-tag-logo" /> Floricultura Premium</span>
          <h1>Flora Casa Verde</h1>
          <p>Transforme momentos especiais com arranjos florais feitos com carinho e dedicação. Entrega rápida em Pouso Alegre e região.</p>
          <div className="hero-btns">
            <Link to="/catalogo" className="btn btn-secondary">Ver Catálogo <FaArrowRight /></Link>
            <a href="https://wa.me/553534213165" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Fale Conosco</a>
          </div>
          <div className="hero-badges">
            <span><FaTruck /> Entrega Rápida</span>
            <span><FaCreditCard /> 3× s/ juros</span>
            <span><FaStar /> 4.9 Avaliações</span>
          </div>
        </div>
        <div className="hero-float hero-float-1">🌸</div>
        <div className="hero-float hero-float-2">🌺</div>
        <div className="hero-float hero-float-3">🌷</div>
      </section>

      {/* About */}
      <section className="about section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-img">
              <img src={IMAGES.about} alt="Nossa floricultura" loading="lazy" />
            </div>
            <div className="about-text">
              <h2 className="section-title">Sobre Nós</h2>
              <p>A <strong>Flora Casa Verde</strong> nasceu em 2010 com o sonho de levar beleza e emoção através das flores. Cada arranjo é feito à mão com flores selecionadas, garantindo frescor e qualidade incomparáveis.</p>
              <div className="about-features">
                <div className="about-feature glass-card">
                  <FaSeedling className="feature-icon" />
                  <h4>Flores Frescas</h4>
                  <p>Selecionadas diariamente</p>
                </div>
                <div className="about-feature glass-card">
                  <FaHeart className="feature-icon" />
                  <h4>Feito com Amor</h4>
                  <p>Cada arranjo é único</p>
                </div>
                <div className="about-feature glass-card">
                  <FaTruck className="feature-icon" />
                  <h4>Entrega Rápida</h4>
                  <p>Mesmo dia para Pouso Alegre</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories section">
        <div className="container">
          <h2 className="section-title">Nossas Categorias</h2>
          <p className="section-subtitle">Encontre o presente perfeito para cada ocasião</p>
          <div className="categories-grid">
            {[
              { key: 'buques', label: 'Buquês', desc: 'Arranjos românticos e elegantes', img: IMAGES.catBuques },
              { key: 'arranjos', label: 'Arranjos', desc: 'Composições criativas e únicas', img: IMAGES.catArranjos },
              { key: 'cestas', label: 'Cestas', desc: 'Combinações encantadoras', img: IMAGES.catCestas },
              { key: 'avulsas', label: 'Flores Avulsas', desc: 'A beleza individual das flores', img: IMAGES.catAvulsas },
            ].map(cat => (
              <Link to={`/catalogo?categoria=${cat.key}`} className="category-card glass-card" key={cat.key}>
                <img src={cat.img} alt={cat.label} loading="lazy" />
                <div className="category-overlay">
                  <h3>{cat.label}</h3>
                  <p>{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured section">
        <div className="container">
          <h2 className="section-title">Destaques</h2>
          <p className="section-subtitle">Os queridinhos dos nossos clientes</p>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/catalogo" className="btn btn-primary">Ver Todos os Produtos <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <h2 className="section-title">O que dizem nossos clientes</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card glass-card" key={i}>
                <div className="testimonial-stars">
                  {[...Array(t.stars)].map((_, j) => <FaStar key={j} className="star-filled" />)}
                </div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section">
        <div className="container cta-content">
          <h2>Faça alguém feliz hoje!</h2>
          <p>Encomende agora e surpreenda com flores lindas e frescas entregues no mesmo dia.</p>
          <div className="cta-btns">
            <Link to="/catalogo" className="btn btn-secondary">Comprar Agora</Link>
            <a href="https://wa.me/553534213165" className="btn btn-outline" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
