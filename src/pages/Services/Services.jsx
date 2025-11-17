import { useLoaderData, useNavigation, useSearchParams } from 'react-router-dom'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import { useMemo, useState } from 'react'

const categories = [
  'All',
  'Cleaning',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Appliance',
  'Outdoor',
  'Security',
  'Tech Support',
  'Moving',
  'Design',
  'Construction',
  'Lifestyle',
  'Education',
]

const Services = () => {
  const data = useLoaderData()
  const navigation = useNavigation()
  const loading = navigation.state === 'loading'
  const [params, setParams] = useSearchParams()

  const q = params.get('search') || ''
  const cat = params.get('category') || 'All'
  const min = params.get('minPrice') || ''
  const max = params.get('maxPrice') || ''
  const sort = params.get('sort') || ''

  const [searchText, setSearchText] = useState(q)
  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)

  const updateParams = (updates) => {
    const next = new URLSearchParams(params)
    Object.entries(updates).forEach(([k, v]) => {
      if (v === '' || v == null) next.delete(k)
      else next.set(k, v)
    })
    setParams(next, { replace: true })
  }

  const onSearch = (e) => {
    e.preventDefault()
    updateParams({ search: searchText })
  }

  const onApplyPrice = () => {
    updateParams({ minPrice, maxPrice })
  }

  const onReset = () => {
    setSearchText('')
    setMinPrice('')
    setMaxPrice('')
    setParams({}, { replace: true })
  }

  const rows = useMemo(() => data || [], [data])

  return (
    <section className="container-x py-12">
      <h1 className="text-cosmic text-3xl sm:text-4xl font-extrabold mb-4">Find services</h1>

      <div className="card bg-white/10 border border-white/15 text-white shadow-xl p-4 mb-4">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <form onSubmit={onSearch} className="flex gap-2">
            <input
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              placeholder="Search services"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="cosmic-btn whitespace-nowrap">Search</button>
          </form>

          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              min="0"
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button className="cosmic-btn whitespace-nowrap" onClick={onApplyPrice}>Apply</button>
          </div>

          <div className="flex">
            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="select select-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            >
              <option value="">Sort</option>
              <option value="rating">Top rated</option>
              <option value="price">Price (desc)</option>
            </select>
          </div>

          <div className="flex items-center justify-end">
            <button className="cosmic-btn-outline" onClick={onReset}>Reset</button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {categories.map((c) => {
          const active = cat === c
          return (
            <button
              key={c}
              className={active ? 'cosmic-btn' : 'cosmic-btn-outline'}
              onClick={() => updateParams({ category: c === 'All' ? '' : c })}
            >
              {c}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card bg-white/10 border border-white/15 text-white shadow-xl p-4">
              <div className="skeleton w-full h-40 mb-3" />
              <div className="skeleton h-5 w-2/3 mb-2" />
              <div className="skeleton h-4 w-1/2 mb-2" />
              <div className="skeleton h-9 w-32" />
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="text-white text-center mt-6">No services found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((svc) => (
            <ServiceCard key={svc._id || svc.id} service={svc} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Services