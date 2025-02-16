// src/services/tax/TaxCalculator.ts
interface TaxInput {
  income: number;
  costs: number;
  type: 'personal' | 'business';
}

export class TaxCalculator {
  static calculateIncomeTax(input: TaxInput): number {
    const taxableIncome = input.income - input.costs;

    if (input.type === 'personal') {
      if (taxableIncome <= 50000000) return taxableIncome * 0.15;
      if (taxableIncome <= 100000000) return taxableIncome * 0.2;
      return taxableIncome * 0.25;
    }

    // محاسبه مالیات شرکتی
    return taxableIncome * 0.25;
  }
}
