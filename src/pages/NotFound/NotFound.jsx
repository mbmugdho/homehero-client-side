import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageTitle } from '../../usePageTitle'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <PageTitle
        title="Error 404 - Page Not Found"
        description="Oops! The page you are looking for does not exist on HomeHero"
      />
      <div className="min-h-screen flex flex-col justify-center items-center text-white  px-4">
        <img
          src="https://i.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
          alt="Not found funny gif"
          className="w-120 max-w-full mb-6 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.15)]"
        />

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl text-lg font-semibold cosmic-btn hover:bg-cosmic/80 transition-all shadow-[0_0_15px_rgba(105,0,255,0.5)]"
        >
          Go Back
        </button>
      </div>
    </>
  )
}
