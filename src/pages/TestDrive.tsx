import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Vehicle, TestDriveRequest } from '../types';
import inventoryData from '../data/inventory.json';
import financeParams from '../data/finance_params.json';

const TestDrive = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<TestDriveRequest>({
    name: '',
    phone: '',
    email: '',
    vehicleId: id || '',
    branchId: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const foundVehicle = (inventoryData.vehicles as Vehicle[]).find(
      (v) => v.id === id
    );
    setVehicle(foundVehicle || null);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    console.log('Test Drive Request:', formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-green-700 mb-6">
            Gracias por tu interés en el {vehicle.name}. Nos pondremos en contacto
            contigo pronto para confirmar tu prueba de manejo.
          </p>
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="inline-block bg-toyota-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-toyota-red-dark transition-colors"
          >
            Volver al detalle del vehículo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Agendar Test Drive - {vehicle.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
            />
          </div>

          <div>
            <label
              htmlFor="branchId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sucursal *
            </label>
            <select
              id="branchId"
              name="branchId"
              required
              value={formData.branchId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
            >
              <option value="">Seleccionar sucursal</option>
              {financeParams.branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="preferredDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Fecha preferida *
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.preferredDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
            />
          </div>

          <div>
            <label
              htmlFor="preferredTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora preferida *
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              required
              value={formData.preferredTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
            >
              <option value="">Seleccionar hora</option>
              {financeParams.testDriveHours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-toyota-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-toyota-red-dark transition-colors"
            >
              Solicitar Test Drive
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="text-toyota-red hover:text-toyota-red-dark"
          >
            Volver al detalle del vehículo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestDrive; 