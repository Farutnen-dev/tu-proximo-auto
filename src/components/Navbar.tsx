import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/images/toyota-logo.svg" alt="Toyota Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-semibold text-toyota-gray">Tu Próximo Toyota</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-toyota-red">Inventario</Link>
            <Link to="/finance" className="text-gray-700 hover:text-toyota-red">Financiamiento</Link>
            <Link to="/test-drive" className="text-gray-700 hover:text-toyota-red">Agendar Prueba</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 