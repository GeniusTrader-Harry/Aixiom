export default function Section({
  id,
  children,
  className = '',
  background = 'white'
}) {
  const backgrounds = {
    white: 'bg-black',
    gray: 'bg-gray-950',
    primary: 'bg-gray-900',
    dark: 'bg-black'
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
