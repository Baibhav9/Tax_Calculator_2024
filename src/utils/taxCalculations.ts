
// 2024 Tax Year Federal Tax Brackets
export const FEDERAL_TAX_BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ],
  marriedFilingJointly: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 }
  ],
  marriedFilingSeparately: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 }
  ],
  headOfHousehold: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ]
};

// 2024 Standard Deductions
export const STANDARD_DEDUCTIONS_2024 = {
  single: 14600,
  marriedFilingJointly: 29200,
  marriedFilingSeparately: 14600,
  headOfHousehold: 21900
};

// FICA Tax Rates and Limits for 2024
export const FICA_2024 = {
  socialSecurityRate: 0.062,
  medicareRate: 0.0145,
  socialSecurityWageBase: 168600,
  medicareAdditionalRate: 0.009,
  medicareAdditionalThreshold: {
    single: 200000,
    marriedFilingJointly: 250000,
    marriedFilingSeparately: 125000,
    headOfHousehold: 200000
  }
};

// State tax information (simplified - major states)
export const STATE_TAX_INFO = {
  'AL': { name: 'Alabama', rate: 0.05, hasIncomeTax: true },
  'AK': { name: 'Alaska', rate: 0.00, hasIncomeTax: false },
  'AZ': { name: 'Arizona', rate: 0.042, hasIncomeTax: true },
  'AR': { name: 'Arkansas', rate: 0.055, hasIncomeTax: true },
  'CA': { name: 'California', rate: 0.093, hasIncomeTax: true },
  'CO': { name: 'Colorado', rate: 0.0455, hasIncomeTax: true },
  'CT': { name: 'Connecticut', rate: 0.0699, hasIncomeTax: true },
  'DE': { name: 'Delaware', rate: 0.066, hasIncomeTax: true },
  'FL': { name: 'Florida', rate: 0.00, hasIncomeTax: false },
  'GA': { name: 'Georgia', rate: 0.0575, hasIncomeTax: true },
  'HI': { name: 'Hawaii', rate: 0.11, hasIncomeTax: true },
  'ID': { name: 'Idaho', rate: 0.058, hasIncomeTax: true },
  'IL': { name: 'Illinois', rate: 0.0495, hasIncomeTax: true },
  'IN': { name: 'Indiana', rate: 0.0323, hasIncomeTax: true },
  'IA': { name: 'Iowa', rate: 0.0853, hasIncomeTax: true },
  'KS': { name: 'Kansas', rate: 0.057, hasIncomeTax: true },
  'KY': { name: 'Kentucky', rate: 0.045, hasIncomeTax: true },
  'LA': { name: 'Louisiana', rate: 0.0425, hasIncomeTax: true },
  'ME': { name: 'Maine', rate: 0.0715, hasIncomeTax: true },
  'MD': { name: 'Maryland', rate: 0.0575, hasIncomeTax: true },
  'MA': { name: 'Massachusetts', rate: 0.05, hasIncomeTax: true },
  'MI': { name: 'Michigan', rate: 0.0425, hasIncomeTax: true },
  'MN': { name: 'Minnesota', rate: 0.0985, hasIncomeTax: true },
  'MS': { name: 'Mississippi', rate: 0.05, hasIncomeTax: true },
  'MO': { name: 'Missouri', rate: 0.0495, hasIncomeTax: true },
  'MT': { name: 'Montana', rate: 0.0675, hasIncomeTax: true },
  'NE': { name: 'Nebraska', rate: 0.0684, hasIncomeTax: true },
  'NV': { name: 'Nevada', rate: 0.00, hasIncomeTax: false },
  'NH': { name: 'New Hampshire', rate: 0.00, hasIncomeTax: false },
  'NJ': { name: 'New Jersey', rate: 0.1075, hasIncomeTax: true },
  'NM': { name: 'New Mexico', rate: 0.059, hasIncomeTax: true },
  'NY': { name: 'New York', rate: 0.109, hasIncomeTax: true },
  'NC': { name: 'North Carolina', rate: 0.0475, hasIncomeTax: true },
  'ND': { name: 'North Dakota', rate: 0.0295, hasIncomeTax: true },
  'OH': { name: 'Ohio', rate: 0.0399, hasIncomeTax: true },
  'OK': { name: 'Oklahoma', rate: 0.05, hasIncomeTax: true },
  'OR': { name: 'Oregon', rate: 0.099, hasIncomeTax: true },
  'PA': { name: 'Pennsylvania', rate: 0.0307, hasIncomeTax: true },
  'RI': { name: 'Rhode Island', rate: 0.0599, hasIncomeTax: true },
  'SC': { name: 'South Carolina', rate: 0.07, hasIncomeTax: true },
  'SD': { name: 'South Dakota', rate: 0.00, hasIncomeTax: false },
  'TN': { name: 'Tennessee', rate: 0.00, hasIncomeTax: false },
  'TX': { name: 'Texas', rate: 0.00, hasIncomeTax: false },
  'UT': { name: 'Utah', rate: 0.0485, hasIncomeTax: true },
  'VT': { name: 'Vermont', rate: 0.0875, hasIncomeTax: true },
  'VA': { name: 'Virginia', rate: 0.0575, hasIncomeTax: true },
  'WA': { name: 'Washington', rate: 0.00, hasIncomeTax: false },
  'WV': { name: 'West Virginia', rate: 0.065, hasIncomeTax: true },
  'WI': { name: 'Wisconsin', rate: 0.0765, hasIncomeTax: true },
  'WY': { name: 'Wyoming', rate: 0.00, hasIncomeTax: false }
};

export interface TaxCalculationInput {
  income: number;
  filingStatus: string;
  state: string;
  federalWithholding: number;
  stateWithholding: number;
  otherDeductions: number;
  dependents: number;
  hasRetirementContributions: boolean;
  retirementContributions: number;
  hasStudentLoanInterest: boolean;
  studentLoanInterest: number;
  hasCharitableDeductions: boolean;
  charitableDeductions: number;
}

export interface TaxCalculationResult {
  grossIncome: number;
  adjustedGrossIncome: number;
  standardDeduction: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalFederalTax: number;
  totalStateTax: number;
  totalTaxes: number;
  netIncome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  refundOrOwed: number;
  taxBracketDetails: Array<{
    rate: number;
    min: number;
    max: number;
    taxableAmount: number;
    taxOwed: number;
  }>;
}

export function calculateFederalTax(taxableIncome: number, filingStatus: string): { tax: number; bracketDetails: any[]; marginalRate: number } {
  const brackets = FEDERAL_TAX_BRACKETS_2024[filingStatus as keyof typeof FEDERAL_TAX_BRACKETS_2024];
  let tax = 0;
  let marginalRate = 0;
  const bracketDetails: any[] = [];

  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      const taxForBracket = taxableInBracket * bracket.rate;
      tax += taxForBracket;
      marginalRate = bracket.rate;

      if (taxableInBracket > 0) {
        bracketDetails.push({
          rate: bracket.rate,
          min: bracket.min,
          max: bracket.max === Infinity ? 'No Limit' : bracket.max,
          taxableAmount: taxableInBracket,
          taxOwed: taxForBracket
        });
      }
    }
  }

  return { tax, bracketDetails, marginalRate };
}

export function calculateFICATaxes(income: number, filingStatus: string): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
} {
  const socialSecurity = Math.min(income, FICA_2024.socialSecurityWageBase) * FICA_2024.socialSecurityRate;
  const medicare = income * FICA_2024.medicareRate;
  
  const additionalMedicareThreshold = FICA_2024.medicareAdditionalThreshold[filingStatus as keyof typeof FICA_2024.medicareAdditionalThreshold];
  const additionalMedicare = income > additionalMedicareThreshold 
    ? (income - additionalMedicareThreshold) * FICA_2024.medicareAdditionalRate 
    : 0;

  return { socialSecurity, medicare, additionalMedicare };
}

export function calculateStateTax(taxableIncome: number, state: string): number {
  const stateInfo = STATE_TAX_INFO[state as keyof typeof STATE_TAX_INFO];
  if (!stateInfo || !stateInfo.hasIncomeTax) return 0;
  return taxableIncome * stateInfo.rate;
}

export function calculateTaxes(input: TaxCalculationInput): TaxCalculationResult {
  const grossIncome = input.income;
  
  // Calculate adjustments to income
  let adjustments = 0;
  if (input.hasRetirementContributions) {
    adjustments += Math.min(input.retirementContributions, 23000); // 2024 401k limit
  }
  if (input.hasStudentLoanInterest) {
    adjustments += Math.min(input.studentLoanInterest, 2500); // 2024 student loan interest deduction limit
  }
  
  const adjustedGrossIncome = grossIncome - adjustments;
  
  // Standard deduction
  const standardDeduction = STANDARD_DEDUCTIONS_2024[input.filingStatus as keyof typeof STANDARD_DEDUCTIONS_2024];
  
  // Calculate taxable income
  let totalDeductions = standardDeduction + input.otherDeductions;
  if (input.hasCharitableDeductions) {
    totalDeductions += input.charitableDeductions;
  }
  
  const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);
  
  // Calculate federal tax
  const { tax: federalTax, bracketDetails, marginalRate } = calculateFederalTax(taxableIncome, input.filingStatus);
  
  // Calculate FICA taxes
  const { socialSecurity, medicare, additionalMedicare } = calculateFICATaxes(grossIncome, input.filingStatus);
  
  // Calculate state tax
  const stateTax = calculateStateTax(taxableIncome, input.state);
  
  // Calculate totals
  const totalFederalTax = federalTax;
  const totalStateTax = stateTax;
  const totalTaxes = totalFederalTax + totalStateTax + socialSecurity + medicare + additionalMedicare;
  const netIncome = grossIncome - totalTaxes;
  const effectiveTaxRate = grossIncome > 0 ? (totalTaxes / grossIncome) * 100 : 0;
  
  // Calculate refund or amount owed
  const totalWithholding = input.federalWithholding + input.stateWithholding;
  const refundOrOwed = totalWithholding - totalTaxes;

  return {
    grossIncome,
    adjustedGrossIncome,
    standardDeduction,
    taxableIncome,
    federalTax,
    stateTax,
    socialSecurityTax: socialSecurity,
    medicareTax: medicare,
    additionalMedicareTax: additionalMedicare,
    totalFederalTax,
    totalStateTax,
    totalTaxes,
    netIncome,
    effectiveTaxRate,
    marginalTaxRate: marginalRate * 100,
    refundOrOwed,
    taxBracketDetails: bracketDetails
  };
}
