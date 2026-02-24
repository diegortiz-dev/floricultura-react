import { FaMapMarkerAlt, FaPhone, FaClock, FaBus, FaSubway, FaCar } from 'react-icons/fa';

export default function Location() {
  return (
    <>
      <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(129,199,132,0.7))' }}>
        <div className="container"><h1>Localização</h1><p>Venha nos visitar!</p></div>
      </section>

      <section className="location section">
        <div className="container location-grid">
          <div className="location-map glass-card">
            <iframe
              title="Flora Casa Verde - Localização"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6339!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzgnMDIuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="location-info">
            <div className="location-card glass-card">
              <FaMapMarkerAlt className="location-card-icon" />
              <h3>Endereço</h3>
              <p>Rua das Flores, 123 - Centro<br />São Paulo - SP, CEP 01001-000</p>
            </div>

            <div className="location-card glass-card">
              <FaPhone className="location-card-icon" />
              <h3>Contato</h3>
              <p>(11) 99999-9999<br />contato@floracasaverde.com</p>
            </div>

            <div className="location-card glass-card">
              <FaClock className="location-card-icon" />
              <h3>Horário de Funcionamento</h3>
              <div className="schedule-table">
                <div><span>Segunda a Sexta</span><span>8h às 19h</span></div>
                <div><span>Sábado</span><span>8h às 17h</span></div>
                <div><span>Domingo</span><span>9h às 13h</span></div>
                <div><span>Feriados</span><span>9h às 13h</span></div>
              </div>
            </div>

            <div className="location-card glass-card">
              <FaBus className="location-card-icon" />
              <h3>Como Chegar</h3>
              <div className="transport-list">
                <p><FaSubway /> <strong>Metrô:</strong> Estação Sé (Linha 1 – Azul) — 5 min a pé</p>
                <p><FaBus /> <strong>Ônibus:</strong> Linhas que passam pela Rua da Consolação</p>
                <p><FaCar /> <strong>Carro:</strong> Estacionamento conveniado ao lado</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
