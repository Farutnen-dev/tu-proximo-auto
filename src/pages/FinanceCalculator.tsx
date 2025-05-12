import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Vehicle, FinanceCalculation } from '../types';
import inventoryData from '../data/inventory.json';
import financeParams from '../data/finance_params.json';

const FinanceCalculator = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState(12);
  const [calculation, setCalculation] = useState<FinanceCalculation | null>(null);

  useEffect(() => {
    const foundVehicle = (inventoryData.vehicles as Vehicle[]).find(
      (v) => v.id === id
    );
    setVehicle(foundVehicle || null);
  }, [id]);

  useEffect(() => {
    if (vehicle) {
      calculateFinancing();
    }
  }, [vehicle, downPayment, term]);

  const calculateFinancing = () => {
    if (!vehicle) return;

    const vehiclePrice = vehicle.price.base;
    const minDownPayment = vehiclePrice * financeParams.savingsPlan.minDownPayment;
    const actualDownPayment = Math.max(downPayment, minDownPayment);
    const financedAmount = vehiclePrice - actualDownPayment;

    const interestRate = vehicle.type === 'new'
      ? financeParams.interestRates.new
      : financeParams.interestRates.used;

    const monthlyRate = interestRate / 12;
    const monthlyPayment =
      (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);

    const additionalCosts = {
      transferTax: vehiclePrice * financeParams.additionalCosts.transferTax,
      insurance: vehiclePrice * financeParams.additionalCosts.insurance,
      registration: vehiclePrice * financeParams.additionalCosts.registration,
      documentation: vehiclePrice * financeParams.additionalCosts.documentation,
    };

    const totalAdditionalCosts = Object.values(additionalCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );

    setCalculation({
      vehiclePrice,
      downPayment: actualDownPayment,
      term,
      monthlyPayment,
      totalCost: financedAmount + totalAdditionalCosts,
      additionalCosts,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!vehicle || !calculation) {
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Calculadora de Financiación - {vehicle.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anticipo
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                min={vehicle.price.base * financeParams.savingsPlan.minDownPayment}
                max={vehicle.price.base}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
              />
              <p className="mt-1 text-sm text-gray-500">
                Mínimo: {formatCurrency(vehicle.price.base * financeParams.savingsPlan.minDownPayment)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plazo (meses)
              </label>
              <select
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-toyota-red"
              >
                {[12, 24, 36, 48, 60].map((months) => (
                  <option key={months} value={months}>
                    {months} meses
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen de Financiación
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Precio del vehículo:</span>
                <span className="font-medium">{formatCurrency(calculation.vehiclePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Anticipo:</span>
                <span className="font-medium">{formatCurrency(calculation.downPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cuota mensual:</span>
                <span className="font-medium">{formatCurrency(calculation.monthlyPayment)}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos y gastos:</span>
                <span className="font-medium">
                  {formatCurrency(
                    Object.values(calculation.additionalCosts).reduce(
                      (sum, cost) => sum + cost,
                      0
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-toyota-red">
                <span>Total a financiar:</span>
                <span>{formatCurrency(calculation.totalCost)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            * Esta es una estimación. Los valores finales pueden variar según las condiciones
            actuales del mercado y la aprobación del crédito.
          </p>
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="inline-block text-toyota-red hover:text-toyota-red-dark"
          >
            Volver al detalle del vehículo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculator; 