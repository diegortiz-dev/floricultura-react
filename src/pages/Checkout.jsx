import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTruck, FaStore, FaCreditCard, FaBarcode, FaMoneyBillWave, FaQrcode, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/products';

export default function Checkout() {
  const { cartItems, cartTotal, cartCount, placeOrder, showToast } = useApp();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState('entrega');
  const [payment, setPayment] = useState('');
  const [orderNum, setOrderNum] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', cep: '', address: '', number: '', complement: '', neighborhood: '', message: '' });

  const shippingCost = delivery === 'entrega' ? 15 : 0;
  const total = cartTotal + shippingCost;

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !payment) {
      showToast('Preencha todos os campos obrigatórios!', 'error');
      return;
    }
    if (delivery === 'entrega' && (!form.cep || !form.address || !form.number || !form.neighborhood)) {
      showToast('Preencha o endereço completo!', 'error');
      return;
    }
    const num = placeOrder({ delivery, payment, shipping: shippingCost, total, customer: form });
    setOrderNum(num);
  };

  if (cartCount === 0 && !orderNum) {
    navigate('/carrinho');
    return null;
  }

  if (orderNum) {
    return (
      <>
        <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(129,199,132,0.7))' }}>
          <div className="container"><h1>Pedido Confirmado!</h1></div>
        </section>
        <section className="section">
          <div className="container">
            <div className="order-success glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <FaCheckCircle style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }} />
              <h2>Obrigado pela compra!</h2>
              <p className="order-number">Pedido <strong>{orderNum}</strong></p>
              <p>Você receberá os detalhes por e-mail em breve.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                <Link to="/" className="btn btn-primary">Voltar ao Início</Link>
                <Link to="/catalogo" className="btn btn-outline">Continuar Comprando</Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(129,199,132,0.7))' }}>
        <div className="container"><h1>Finalizar Pedido</h1><p>{cartCount} ite{cartCount > 1 ? 'ns' : 'm'} — {formatPrice(cartTotal)}</p></div>
      </section>

      <section className="checkout section">
        <div className="container">
          <Link to="/carrinho" className="btn btn-outline" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}><FaArrowLeft /> Voltar ao Carrinho</Link>
          <form className="checkout-grid" onSubmit={handleSubmit}>
            <div className="checkout-form">
              {/* Delivery Method */}
              <div className="checkout-section glass-card">
                <h3>Método de Entrega</h3>
                <div className="delivery-options">
                  <label className={`delivery-option${delivery === 'entrega' ? ' active' : ''}`}>
                    <input type="radio" name="delivery" value="entrega" checked={delivery === 'entrega'} onChange={() => setDelivery('entrega')} />
                    <FaTruck /> <div><strong>Entrega em Domicílio</strong><span>Taxa de entrega: R$ 15,00</span></div>
                  </label>
                  <label className={`delivery-option${delivery === 'retirada' ? ' active' : ''}`}>
                    <input type="radio" name="delivery" value="retirada" checked={delivery === 'retirada'} onChange={() => setDelivery('retirada')} />
                    <FaStore /> <div><strong>Retirada na Loja</strong><span>Grátis</span></div>
                  </label>
                </div>
              </div>

              {/* Personal Info */}
              <div className="checkout-section glass-card">
                <h3>Dados Pessoais</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nome Completo *</label>
                    <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>E-mail *</label>
                    <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Telefone *</label>
                    <input type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} required />
                  </div>
                </div>
              </div>

              {/* Address */}
              {delivery === 'entrega' && (
                <div className="checkout-section glass-card">
                  <h3>Endereço de Entrega</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>CEP *</label>
                      <input type="text" value={form.cep} onChange={e => updateField('cep', e.target.value)} required />
                    </div>
                    <div className="form-group form-group-wide">
                      <label>Endereço *</label>
                      <input type="text" value={form.address} onChange={e => updateField('address', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Número *</label>
                      <input type="text" value={form.number} onChange={e => updateField('number', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Complemento</label>
                      <input type="text" value={form.complement} onChange={e => updateField('complement', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Bairro *</label>
                      <input type="text" value={form.neighborhood} onChange={e => updateField('neighborhood', e.target.value)} required />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment */}
              <div className="checkout-section glass-card">
                <h3>Pagamento</h3>
                <div className="payment-options">
                  {[
                    { val: 'pix', icon: <FaQrcode />, label: 'PIX', desc: '5% de desconto' },
                    { val: 'credito', icon: <FaCreditCard />, label: 'Cartão de Crédito', desc: 'Até 3× sem juros' },
                    { val: 'debito', icon: <FaCreditCard />, label: 'Cartão de Débito', desc: 'À vista' },
                    { val: 'boleto', icon: <FaBarcode />, label: 'Boleto', desc: 'Vence em 3 dias' },
                    { val: 'dinheiro', icon: <FaMoneyBillWave />, label: 'Dinheiro', desc: 'Na entrega/retirada' },
                  ].map(opt => (
                    <label className={`payment-option${payment === opt.val ? ' active' : ''}`} key={opt.val}>
                      <input type="radio" name="payment" value={opt.val} checked={payment === opt.val} onChange={() => setPayment(opt.val)} />
                      {opt.icon} <div><strong>{opt.label}</strong><span>{opt.desc}</span></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="checkout-section glass-card">
                <h3>Mensagem no Cartão (opcional)</h3>
                <textarea
                  rows="3"
                  placeholder="Escreva uma mensagem especial para acompanhar as flores..."
                  value={form.message}
                  onChange={e => updateField('message', e.target.value)}
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="checkout-summary glass-card">
              <h3>Resumo</h3>
              <div className="checkout-items-list">
                {cartItems.map(item => (
                  <div className="checkout-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <span>{item.name}</span>
                      <small>{item.quantity}× {formatPrice(item.price)}</small>
                    </div>
                    <span>{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="summary-row"><span>Entrega</span><span>{shippingCost ? formatPrice(shippingCost) : 'Grátis'}</span></div>
              {payment === 'pix' && <div className="summary-row discount-row"><span>Desc. PIX (5%)</span><span>-{formatPrice(cartTotal * 0.05)}</span></div>}
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{formatPrice(payment === 'pix' ? total * 0.95 : total)}</span>
              </div>
              <button type="submit" className="btn btn-secondary btn-block">Confirmar Pedido</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
