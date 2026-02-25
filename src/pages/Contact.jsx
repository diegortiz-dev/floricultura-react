import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Preencha os campos obrigatórios!', 'error');
      return;
    }
    showToast('Mensagem enviada com sucesso! Responderemos em breve.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <>
      <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(216,27,96,0.55))' }}>
        <div className="container"><h1>Contato</h1><p>Fale conosco, estamos aqui para ajudar!</p></div>
      </section>

      <section className="contact section">
        <div className="container contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2>Informações de Contato</h2>
            <p>Entre em contato e teremos prazer em atendê-lo.</p>

            <div className="contact-cards">
              <div className="contact-card glass-card">
                <FaPhone className="contact-card-icon" />
                <h4>Telefone</h4>
                <p>(35) 3421-3165</p>
              </div>
              <div className="contact-card glass-card">
                <FaEnvelope className="contact-card-icon" />
                <h4>E-mail</h4>
                <p>contato@floracasaverde.com</p>
              </div>
              <div className="contact-card glass-card">
                <FaMapMarkerAlt className="contact-card-icon" />
                <h4>Endereço</h4>
                <p>Av. Duque de Caxias, 265 - Centro<br />Pouso Alegre - MG, 37550-000</p>
              </div>
              <div className="contact-card glass-card">
                <FaClock className="contact-card-icon" />
                <h4>Horário</h4>
                <p>Seg–Sex: 8h–18h<br />Sáb: 8h–16h | Dom: Fechado</p>
              </div>
            </div>

            <a href="https://wa.me/553534213165" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              <FaWhatsapp /> Falar pelo WhatsApp
            </a>
          </div>

          {/* Form */}
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h2>Envie sua Mensagem</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome *</label>
                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required />
              </div>
              <div className="form-group">
                <label>E-mail *</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Assunto</label>
                <select value={form.subject} onChange={e => update('subject', e.target.value)}>
                  <option value="">Selecione...</option>
                  <option value="duvida">Dúvida</option>
                  <option value="encomenda">Encomenda Especial</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="elogio">Elogio</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="form-group form-group-wide">
                <label>Mensagem *</label>
                <textarea rows="5" value={form.message} onChange={e => update('message', e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="btn btn-secondary"><FaPaperPlane /> Enviar Mensagem</button>
          </form>
        </div>
      </section>
    </>
  );
}
