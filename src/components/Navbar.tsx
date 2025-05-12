import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/toyota-logo.png" alt="Toyota Kansai Logo" className="h-6 w-auto mr-2" style={{ maxHeight: '40px', width: 'auto' }} />
            <span className="text-2xl font-bold text-toyota-black tracking-wide">TOYOTA</span>
          </Link>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar 
