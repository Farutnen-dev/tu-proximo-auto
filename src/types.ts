export interface Vehicle {
  id: string
  name: string
  type: 'new' | 'used'
  year: number
  price: {
    base: number
    currency: string
  }
  images: string[]
  features: string[]
  description: string
  certified?: boolean
  warranty?: string
}

export interface FinanceParams {
  interestRates: {
    new: number
    used: number
  }
  additionalCosts: {
    transferTax: number
    insurance: number
    registration: number
    documentation: number
  }
  savingsPlan: {
    minDownPayment: number
    maxTerm: number
    monthlyFee: number
  }
  branches: Branch[]
  testDriveHours: string[]
}

export interface Branch {
  id: string
  name: string
  address: string
  phone: string
}

export interface TestDriveRequest {
  name: string
  phone: string
  email: string
  vehicleId: string
  branchId: string
  preferredDate: string
  preferredTime: string
}

export interface FinanceCalculation {
  vehiclePrice: number
  downPayment: number
  term: number
  monthlyPayment: number
  totalCost: number
  additionalCosts: {
    transferTax: number
    insurance: number
    registration: number
    documentation: number
  }
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