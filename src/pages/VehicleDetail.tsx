import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Vehicle } from '../types';
import inventoryData from '../data/inventory.json';

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const foundVehicle = (inventoryData.vehicles as Vehicle[]).find(
      (v) => v.id === id
    );
    setVehicle(foundVehicle || null);
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Vehículo no encontrado
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block text-toyota-red hover:text-toyota-red-dark"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={vehicle.images[selectedImage]}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {vehicle.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? 'ring-2 ring-toyota-red'
                    : 'hover:opacity-75'
                }`}
              >
                <img
                  src={image}
                  alt={`${vehicle.name} - Vista ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
            <p className="text-xl text-toyota-red font-semibold mt-2">
              {formatPrice(vehicle.price.base)}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                vehicle.type === 'new'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {vehicle.type === 'new' ? 'Nuevo' : 'Usado Certificado'}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Características
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {vehicle.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-600"
                >
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {vehicle.type === 'used' && vehicle.certified && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Vehículo Certificado Toyota
              </h3>
              <p className="text-blue-700">
                Este vehículo ha pasado por una rigurosa inspección de 150 puntos
                y cuenta con garantía extendida de {vehicle.warranty}.
              </p>
            </div>
          )}

          <div className="flex space-x-4 pt-6">
            <Link
              to={`/vehicle/${vehicle.id}/finance`}
              className="flex-1 bg-toyota-red text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-toyota-red-dark transition-colors"
            >
              Calcular Financiación
            </Link>
            <Link
              to={`/vehicle/${vehicle.id}/test-drive`}
              className="flex-1 bg-white border-2 border-toyota-red text-toyota-red px-6 py-3 rounded-lg text-center font-semibold hover:bg-toyota-red hover:text-white transition-colors"
            >
              Agendar Test Drive
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail; 