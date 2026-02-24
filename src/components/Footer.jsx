import { Link } from 'react-router-dom';
import { FaLeaf, FaInstagram, FaFacebookF, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-brand">
            <FaLeaf /> Flora Casa Verde
          </div>
          <p>Transformamos momentos especiais com a beleza e o perfume das flores. Desde 2010 levando verde e vida para o seu lar.</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Links Rápidos</h4>
          <Link to="/">Início</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/localizacao">Localização</Link>
          <Link to="/carrinho">Carrinho</Link>
        </div>

        <div className="footer-col">
          <h4>Categorias</h4>
          <Link to="/catalogo?categoria=buques">Buquês</Link>
          <Link to="/catalogo?categoria=arranjos">Arranjos</Link>
          <Link to="/catalogo?categoria=cestas">Cestas</Link>
          <Link to="/catalogo?categoria=avulsas">Flores Avulsas</Link>
        </div>

        <div className="footer-col">
          <h4>Contato</h4>
          <p><FaMapMarkerAlt /> Rua das Flores, 123 - Centro<br />São Paulo - SP</p>
          <p><FaPhone /> (11) 99999-9999</p>
          <p><FaEnvelope /> contato@floracasaverde.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Flora Casa Verde — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
