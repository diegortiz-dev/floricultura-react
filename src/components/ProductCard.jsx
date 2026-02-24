import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart, showToast } = useApp();

  const handleAdd = () => {
    addToCart(product.id);
    showToast(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="product-card glass-card">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-category-badge">{product.categoryLabel}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(product.rating) ? 'star-filled' : 'star-empty'} />
          ))}
          <span>({product.rating})</span>
        </div>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            <FaShoppingCart /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
