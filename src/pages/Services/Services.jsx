import { useLoaderData } from 'react-router-dom'
import ServiceCard from '../../components/ServiceCard/ServiceCard'

export default function Services() {
  const services = useLoaderData()

  return (
    <section className="container-x py-12">
      <header className="mb-6">
        <h1 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
          Browse Services
        </h1>
        <p className="text-white/80 mt-2">
          Hand-picked professionals across home care, repair, and lifestyle
          industries.
        </p>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services?.map((svc) => (
          <ServiceCard key={svc.id} service={svc} />
        ))}
      </div>
    </section>
  )
}
