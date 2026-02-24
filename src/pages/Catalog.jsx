import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSearch, FaSortAmountDown, FaTh, FaList } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS } from '../data/products';

export default function Catalog() {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('categoria') || 'todos';
  const [category, setCategory] = useState(initialCat);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState('grid');

  const filtered = useMemo(() => {
    let list = category === 'todos' ? [...products] : products.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }
    return list;
  }, [products, category, search, sort]);

  const handleCategory = (cat) => {
    setCategory(cat);
    if (cat === 'todos') searchParams.delete('categoria');
    else searchParams.set('categoria', cat);
    setSearchParams(searchParams);
  };

  return (
    <>
      <section className="page-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(46,125,50,0.85), rgba(129,199,132,0.7))' }}>
        <div className="container">
          <h1>Nosso Catálogo</h1>
          <p>Explore nossa coleção completa de flores e arranjos</p>
        </div>
      </section>

      <section className="catalog section">
        <div className="container">
          {/* Filters */}
          <div className="catalog-filters glass-card">
            <div className="filter-row">
              <div className="filter-group search-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar flores..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <FaFilter />
                <select value={category} onChange={e => handleCategory(e.target.value)} className="filter-select">
                  <option value="todos">Todas Categorias</option>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <FaSortAmountDown />
                <select value={sort} onChange={e => setSort(e.target.value)} className="filter-select">
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name">Nome A-Z</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>

              <div className="filter-views">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid"><FaTh /></button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="Lista"><FaList /></button>
              </div>
            </div>
            <p className="filter-count">{filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Category Pills */}
          <div className="category-pills">
            <button className={`pill${category === 'todos' ? ' active' : ''}`} onClick={() => handleCategory('todos')}>Todos</button>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <button key={k} className={`pill${category === k ? ' active' : ''}`} onClick={() => handleCategory(k)}>{v}</button>
            ))}
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="empty-state glass-card">
              <p>Nenhum produto encontrado.</p>
            </div>
          ) : (
            <div className={`products-grid ${view === 'list' ? 'products-list' : ''}`}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
