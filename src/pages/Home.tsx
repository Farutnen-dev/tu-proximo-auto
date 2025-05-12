import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../types';
import inventoryData from '../data/inventory.json';

const Home = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setVehicles(inventoryData.vehicles as Vehicle[]);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Encuentra tu Próximo Toyota
        </h1>
        <p className="text-lg text-gray-600">
          Explora nuestra selección de vehículos nuevos y usados certificados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Link
            key={vehicle.id}
            to={`/vehicle/${vehicle.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={vehicle.images[0]}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    vehicle.type === 'new'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {vehicle.type === 'new' ? 'Nuevo' : 'Usado Certificado'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {vehicle.name}
              </h2>
              <p className="text-gray-600 mb-2">Año: {vehicle.year}</p>
              <p className="text-xl font-bold text-toyota-red">
                {formatPrice(vehicle.price.base)}
              </p>
              {vehicle.type === 'used' && vehicle.certified && (
                <p className="mt-2 text-sm text-blue-600">
                  ✓ Revisión de 150 puntos
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 