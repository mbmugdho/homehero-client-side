import { useSearchParams } from 'react-router-dom'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import Pagination from '../../components/Pagination/Pagination'
import { useEffect, useMemo, useState } from 'react'
import { PageTitle } from '../../usePageTitle'
import { API_BASE_URL } from '../../config'

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

const ITEMS_PER_PAGE = 6

const Services = () => {
  const [params, setParams] = useSearchParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const q = params.get('search') || ''
  const cat = params.get('category') || 'All'
  const min = params.get('minPrice') || ''
  const max = params.get('maxPrice') || ''
  const sort = params.get('sort') || ''
  const pageParam = params.get('page') || '1'

  const [searchText, setSearchText] = useState(q)
  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam, 10))

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams()
        if (q) queryParams.set('search', q)
        if (cat && cat !== 'All') queryParams.set('category', cat)
        if (min) queryParams.set('minPrice', min)
        if (max) queryParams.set('maxPrice', max)
        if (sort) queryParams.set('sort', sort)

        const res = await fetch(`${API_BASE_URL}/services?${queryParams}`)
        if (res.ok) {
          const result = await res.json()
          setData(result)
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [q, cat, min, max, sort])

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
    setCurrentPage(1)
    updateParams({ search: searchText, page: '1' })
  }

  const onApplyPrice = () => {
    setCurrentPage(1)
    updateParams({ minPrice, maxPrice, page: '1' })
  }

  const onReset = () => {
    setSearchText('')
    setMinPrice('')
    setMaxPrice('')
    setCurrentPage(1)
    setParams({}, { replace: true })
  }

  const handleCategoryChange = (c) => {
    setCurrentPage(1)
    updateParams({ category: c === 'All' ? '' : c, page: '1' })
  }

  const handleSortChange = (value) => {
    setCurrentPage(1)
    updateParams({ sort: value, page: '1' })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateParams({ page: page.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const rows = useMemo(() => data || [], [data])

  const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE)
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return rows.slice(start, end)
  }, [rows, currentPage])

  return (
    <div>
      <PageTitle
        title="Services"
        description="Explore all services offered by HomeHero professionals"
      />
      <section className="container-x py-12">
        <h1 className="text-cosmic text-3xl sm:text-4xl font-extrabold mb-4">
          Find services
        </h1>

        <div className="card bg-white/10 border border-white/15 text-white shadow-xl p-4 mb-4">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
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
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                min="0"
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button
                className="cosmic-btn whitespace-nowrap"
                onClick={onApplyPrice}
              >
                Apply
              </button>
            </div>

            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="select select-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            >
              <option value="">Sort by</option>
              <option value="rating">Top rated</option>
              <option value="price">Price (high to low)</option>
            </select>

            <button className="cosmic-btn-outline" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map((c) => {
            const active = cat === c || (c === 'All' && !cat)
            return (
              <button
                key={c}
                className={`${
                  active ? 'cosmic-btn' : 'cosmic-btn-outline'
                } whitespace-nowrap`}
                onClick={() => handleCategoryChange(c)}
              >
                {c}
              </button>
            )
          })}
        </div>

        {!loading && rows.length > 0 && (
          <p className="text-white/60 text-sm mb-4">
            Showing {paginatedRows.length} of {rows.length} services
            {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        )}

        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="card bg-white/10 border border-white/15 text-white shadow-xl overflow-hidden"
              >
                <div className="skeleton w-full h-44 bg-white/10" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-5 w-3/4 bg-white/10" />
                  <div className="skeleton h-4 w-full bg-white/10" />
                  <div className="skeleton h-4 w-1/2 bg-white/10" />
                  <div className="flex gap-2 mt-4">
                    <div className="skeleton h-10 w-28 bg-white/10 rounded-full" />
                    <div className="skeleton h-10 w-28 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white/60 text-lg">No services found.</p>
            <p className="text-white/40 text-sm mt-2">
              Try adjusting your filters
            </p>
            <button onClick={onReset} className="cosmic-btn mt-6">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedRows.map((svc) => (
                <ServiceCard key={svc._id || svc.id} service={svc} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  )
}

export default Services
