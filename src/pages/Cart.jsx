import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaTag, FaShoppingCart } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { formatPrice, applyCoupon } from '../data/products';

export default function Cart() {
  const { cartItems, cartTotal, cartCount, updateCartQty, removeFromCart, clearCart, showToast } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(null);

  const handleCoupon = () => {
    const result = applyCoupon(couponCode, cartTotal);
    if (result) {
      setDiscount(result);
      showToast(`Cupom aplicado! Desconto de ${result.type === 'percent' ? result.value + '%' : formatPrice(result.value)}`);
    } else {
      setDiscount(null);
      showToast('Cupom inválido!', 'error');
    }
  };

  const finalTotal = discount
    ? discount.type === 'percent'
      ? cartTotal * (1 - discount.value / 100)
      : Math.max(0, cartTotal - discount.value)
    : cartTotal;

  if (cartCount === 0) {
    return (
      <>
        <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(129,199,132,0.7))' }}>
          <div className="container"><h1>Meu Carrinho</h1></div>
        </section>
        <section className="section">
          <div className="container">
            <div className="empty-state glass-card">
              <FaShoppingCart style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3>Seu carrinho está vazio</h3>
              <p>Explore nosso catálogo e encontre as flores perfeitas!</p>
              <Link to="/catalogo" className="btn btn-primary" style={{ marginTop: '1rem' }}>Ver Catálogo</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(129,199,132,0.7))' }}>
        <div className="container"><h1>Meu Carrinho</h1><p>{cartCount} ite{cartCount > 1 ? 'ns' : 'm'}</p></div>
      </section>
      <section className="cart section">
        <div className="container cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item glass-card" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <span className="cart-item-cat">{item.categoryLabel}</span>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                </div>
                <div className="cart-item-actions">
                  <div className="qty-control">
                    <button onClick={() => updateCartQty(item.id, item.quantity - 1)} aria-label="Diminuir"><FaMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQty(item.id, item.quantity + 1)} aria-label="Aumentar"><FaPlus /></button>
                  </div>
                  <span className="cart-item-subtotal">{formatPrice(item.subtotal)}</span>
                  <button className="btn-icon btn-danger" onClick={() => { removeFromCart(item.id); showToast('Item removido'); }} aria-label="Remover"><FaTrash /></button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <Link to="/catalogo" className="btn btn-outline"><FaArrowLeft /> Continuar Comprando</Link>
              <button className="btn btn-danger" onClick={() => { clearCart(); setDiscount(null); showToast('Carrinho esvaziado'); }}>Limpar Carrinho</button>
            </div>
          </div>

          <div className="cart-summary glass-card">
            <h3>Resumo do Pedido</h3>
            <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
            
            <div className="coupon-row">
              <div className="coupon-input-group">
                <FaTag />
                <input
                  type="text"
                  placeholder="Cupom de desconto"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                />
                <button className="btn btn-sm btn-primary" onClick={handleCoupon}>Aplicar</button>
              </div>
              {discount && <span className="coupon-applied">✓ {couponCode} aplicado</span>}
            </div>

            {discount && (
              <div className="summary-row discount-row">
                <span>Desconto</span>
                <span>- {discount.type === 'percent' ? `${discount.value}%` : formatPrice(discount.value)}</span>
              </div>
            )}

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>

            <Link to="/checkout" className="btn btn-secondary btn-block">Finalizar Compra</Link>
          </div>
        </div>
      </section>
    </>
  );
}
