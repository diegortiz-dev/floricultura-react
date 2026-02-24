import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUndo, FaStar, FaSearch } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { formatPrice, CATEGORY_LABELS } from '../data/products';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts, showToast, orders } = useApp();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [editId, setEditId] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'buques', price: '', description: '', image: '', rating: '4.5', featured: false });

  const filtered = search.trim()
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : products;

  const resetForm = () => setForm({ name: '', category: 'buques', price: '', description: '', image: '', rating: '4.5', featured: false });

  const openAdd = () => { resetForm(); setEditId(null); setModal('add'); };
  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), description: p.description, image: p.image, rating: String(p.rating), featured: p.featured });
    setEditId(p.id);
    setModal('edit');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description || !form.image) {
      showToast('Preencha todos os campos!', 'error');
      return;
    }
    const data = { ...form, price: parseFloat(form.price), rating: parseFloat(form.rating), featured: !!form.featured };
    if (modal === 'edit' && editId) {
      updateProduct(editId, data);
      showToast('Produto atualizado!');
    } else {
      addProduct(data);
      showToast('Produto adicionado!');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    showToast('Produto removido!');
    setConfirm(null);
  };

  const handleReset = () => {
    resetProducts();
    showToast('Produtos restaurados ao padrão!');
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <>
      <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(216,27,96,0.55))' }}>
        <div className="container"><h1>Painel Admin</h1><p>Gerencie seus produtos e pedidos</p></div>
      </section>

      <section className="admin section">
        <div className="container">
          {/* Stats */}
          <div className="admin-stats">
            <div className="stat-card glass-card">
              <h4>{products.length}</h4><p>Produtos</p>
            </div>
            <div className="stat-card glass-card">
              <h4>{products.filter(p => p.featured).length}</h4><p>Destaques</p>
            </div>
            <div className="stat-card glass-card">
              <h4>{orders.length}</h4><p>Pedidos</p>
            </div>
            <div className="stat-card glass-card">
              <h4>{formatPrice(orders.reduce((s, o) => s + (o.total || 0), 0))}</h4><p>Vendas</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="admin-toolbar glass-card">
            <div className="admin-search">
              <FaSearch />
              <input type="text" placeholder="Buscar produto..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="admin-actions">
              <button className="btn btn-primary" onClick={openAdd}><FaPlus /> Novo Produto</button>
              <button className="btn btn-outline" onClick={handleReset}><FaUndo /> Restaurar Padrão</button>
            </div>
          </div>

          {/* Table */}
          <div className="admin-table-wrapper glass-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Avaliação</th>
                  <th>Destaque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td><img src={p.image} alt={p.name} className="admin-thumb" /></td>
                    <td>{p.name}</td>
                    <td>{p.categoryLabel}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td><FaStar className="star-filled" /> {p.rating}</td>
                    <td>{p.featured ? '⭐' : '—'}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon" onClick={() => openEdit(p)} title="Editar"><FaEdit /></button>
                        <button className="btn-icon btn-danger" onClick={() => setConfirm(p.id)} title="Excluir"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Nenhum produto encontrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal glass-card" onClick={e => e.stopPropagation()}>
            <h2>{modal === 'edit' ? 'Editar Produto' : 'Novo Produto'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-grid">
                <div className="form-group form-group-wide">
                  <label>Nome do Produto *</label>
                  <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Categoria *</label>
                  <select value={form.category} onChange={e => update('category', e.target.value)}>
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Preço (R$) *</label>
                  <input type="number" step="0.01" min="0" value={form.price} onChange={e => update('price', e.target.value)} required />
                </div>
                <div className="form-group form-group-wide">
                  <label>Descrição *</label>
                  <textarea rows="3" value={form.description} onChange={e => update('description', e.target.value)} required />
                </div>
                <div className="form-group form-group-wide">
                  <label>URL da Imagem *</label>
                  <input type="url" value={form.image} onChange={e => update('image', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Avaliação (0-5)</label>
                  <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => update('rating', e.target.value)} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => update('featured', e.target.checked)} />
                  <label htmlFor="featured" style={{ margin: 0 }}>Produto Destaque</label>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setModal(null)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirm && (
        <div className="modal-overlay" onClick={() => setConfirm(null)}>
          <div className="modal glass-card modal-sm" onClick={e => e.stopPropagation()}>
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir este produto?</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirm(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirm)}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
