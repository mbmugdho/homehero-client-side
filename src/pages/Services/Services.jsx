import { useLoaderData } from 'react-router-dom';
import { useState, useMemo } from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Services() {
  const services = useLoaderData();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredServices = useMemo(() => {
    let filtered = services || [];

    if (search.trim()) {
      filtered = filtered.filter((svc) =>
        svc.title.toLowerCase().includes(search.toLowerCase()) ||
        svc.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
    );
  }, [services, search, sortOrder]);

  return (
    <section className="container-x py-12">
   <div className='flex justify-between items-center'>
       <header className="mb-6">
        <h1 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
          Browse Services
        </h1>
        <p className="text-white/80 mt-2">
          Hand-picked professionals across home care, repair, and lifestyle industries.
        </p>
      </header>

      <SearchBar
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
   </div>

      {filteredServices.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      ) : (
        <p className="text-white/70 text-center mt-12">
          No services found matching your criteria.
        </p>
      )}
    </section>
  );
}


