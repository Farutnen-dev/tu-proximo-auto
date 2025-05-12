import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/assets/toyota-logo.png" alt="Toyota Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-semibold text-gray-800">Tu Próximo Toyota</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-toyota-red px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
            <Link to="/" className="text-gray-600 hover:text-toyota-red px-3 py-2 rounded-md text-sm font-medium">Vehículos</Link>
            <Link to="/" className="text-gray-600 hover:text-toyota-red px-3 py-2 rounded-md text-sm font-medium">Usados Certificados</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 