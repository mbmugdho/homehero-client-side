import { Helmet } from 'react-helmet'

export const PageTitle = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title ? `HomeHero | ${title}` : 'HomeHero'}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  )
}
