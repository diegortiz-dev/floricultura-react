import { FaMapMarkerAlt, FaPhone, FaClock, FaBus, FaCar } from 'react-icons/fa';

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d-45.9364!3d-22.2299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca51b5a6b3d1%3A0x0!2sAv.+Duque+de+Caxias%2C+265+-+Centro%2C+Pouso+Alegre+-+MG!5e0!3m2!1spt-BR!2sbr!4v1"
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
              <p>Av. Duque de Caxias, 265 - Centro<br />Pouso Alegre - MG, CEP 37550-000</p>
            </div>

            <div className="location-card glass-card">
              <FaPhone className="location-card-icon" />
              <h3>Contato</h3>
              <p>(35) 3421-3165<br />contato@floracasaverde.com</p>
            </div>

            <div className="location-card glass-card">
              <FaClock className="location-card-icon" />
              <h3>Horário de Funcionamento</h3>
              <div className="schedule-table">
                <div><span>Segunda a Sexta</span><span>08:00 às 18:00</span></div>
                <div><span>Sábado</span><span>08:00 às 16:00</span></div>
                <div><span>Domingo</span><span>Fechado</span></div>
              </div>
            </div>

            <div className="location-card glass-card">
              <FaBus className="location-card-icon" />
              <h3>Como Chegar</h3>
              <div className="transport-list">
                <p><FaBus /> <strong>Ônibus:</strong> Linhas que passam pela Av. Duque de Caxias</p>
                <p><FaCar /> <strong>Carro:</strong> Fácil acesso pelo centro de Pouso Alegre</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
