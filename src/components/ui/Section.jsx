export default function Section({
  id,
  children,
  className = '',
  background = 'white'
}) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50'
  }

  return (
    <section
      id={id}
      className={`py-20 ${backgrounds[background]} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
