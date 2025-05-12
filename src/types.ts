export interface Vehicle {
  id: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: string
  transmission: string
  color: string
  features: string[]
  images: string[]
  description: string
}

export interface FinanceParams {
  interestRate: number
  maxTerm: number
  minDownPayment: number
  maxDownPayment: number
}

export interface TestDriveFormData {
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  vehicleId: string
  comments?: string
} 