import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { cartCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/', label: 'Início' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/contato', label: 'Contato' },
    { to: '/localizacao', label: 'Localização' },
  ];

  return (
    <header className={`header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="brand">
          <img src="/iconflor.jpg" alt="Flora Casa Verde" className="brand-logo" />
          <span>Flora Casa Verde</span>
        </Link>

        <nav className={`nav${menuOpen ? ' nav-open' : ''}`}>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link${location.pathname === l.to ? ' active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/admin" className="nav-link nav-admin">Admin</Link>
        </nav>

        <div className="header-actions">
          <Link to="/carrinho" className="cart-btn" aria-label="Carrinho">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}
