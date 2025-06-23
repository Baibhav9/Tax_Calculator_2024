
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, DollarSign, HelpCircle, PieChart, TrendingUp } from 'lucide-react';
import { calculateTaxes, TaxCalculationInput, TaxCalculationResult } from '@/utils/taxCalculations';
import { TaxResultsChart } from '@/components/TaxResultsChart';

const FILING_STATUS_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'marriedFilingJointly', label: 'Married Filing Jointly' },
  { value: 'marriedFilingSeparately', label: 'Married Filing Separately' },
  { value: 'headOfHousehold', label: 'Head of Household' }
];

export const TaxCalculator = () => {
  const [formData, setFormData] = useState<TaxCalculationInput>({
    income: 0,
    filingStatus: 'single',
    state: 'CA',
    federalWithholding: 0,
    stateWithholding: 0,
    otherDeductions: 0,
    dependents: 0,
    hasRetirementContributions: false,
    retirementContributions: 0,
    hasStudentLoanInterest: false,
    studentLoanInterest: 0,
    hasCharitableDeductions: false,
    charitableDeductions: 0
  });

  const [results, setResults] = useState<TaxCalculationResult | null>(null);

  useEffect(() => {
    if (formData.income > 0) {
      // Apply the Standard/Other deductions logic
      const effectiveDeductions = formData.otherDeductions <= 14600 ? 14600 : formData.otherDeductions;
      
      const modifiedFormData = {
        ...formData,
        otherDeductions: effectiveDeductions
      };
      
      const calculatedResults = calculateTaxes(modifiedFormData);
      setResults(calculatedResults);
    }
  }, [formData]);

  const handleInputChange = (field: keyof TaxCalculationInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="gradient-peacock text-white py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="https://jayard9.sg-host.com/">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Website
                    </Button>
                  </a>
                <div className="flex items-center space-x-3">
                  <div>
                    <h1 className="text-2xl font-bold">2024 Tax Calculator</h1>
                    <p className="text-blue-100">Professional Tax Estimation Tool</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Tax Year</div>
                <div className="text-xl font-semibold">2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-peacock-blue to-water-blue text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Income Information</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Enter your 2024 tax information
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="income" className="flex items-center space-x-2">
                      <span>Annual Gross Income</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your total income before any deductions or taxes</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="income"
                      type="number"
                      min="0"
                      placeholder="Enter your annual income"
                      value={formData.income || ''}
                      onChange={(e) => handleInputChange('income', Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select value={formData.filingStatus} onValueChange={(value) => handleInputChange('filingStatus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILING_STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tax Withholdings</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="federalWithholding" className="flex items-center space-x-2">
                        <span>Federal Tax Withheld</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Amount of federal taxes already withheld from your paychecks</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        id="federalWithholding"
                        type="number"
                        min="0"
                        placeholder="Federal taxes withheld"
                        value={formData.federalWithholding || ''}
                        onChange={(e) => handleInputChange('federalWithholding', Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Deductions & Adjustments</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="otherDeductions">Standard/Other deductions</Label>
                      <Input
                        id="otherDeductions"
                        type="number"
                        min="0"
                        placeholder="Standard/Other deductions"
                        value={formData.otherDeductions || ''}
                        onChange={(e) => handleInputChange('otherDeductions', Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {results && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Tax Liability</p>
                            <p className="text-2xl font-bold text-peacock-blue">{formatCurrency(results.totalTaxes)}</p>
                          </div>
                          <div className="p-3 bg-peacock-blue/10 rounded-full">
                            <TrendingUp className="h-6 w-6 text-peacock-blue" />
                          </div>
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          {formatPercentage(results.effectiveTaxRate)} effective rate
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Net Income</p>
                            <p className="text-2xl font-bold text-green-600">{formatCurrency(results.netIncome)}</p>
                          </div>
                          <div className="p-3 bg-green-100 rounded-full">
                            <DollarSign className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">After all taxes</p>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {results.refundOrOwed >= 0 ? 'Estimated Refund' : 'Amount Owed'}
                            </p>
                            <p className={`text-2xl font-bold ${results.refundOrOwed >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(Math.abs(results.refundOrOwed))}
                            </p>
                          </div>
                          <div className={`p-3 rounded-full ${results.refundOrOwed >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                            <PieChart className={`h-6 w-6 ${results.refundOrOwed >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Based on withholdings</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Breakdown */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Tax Breakdown</CardTitle>
                      <CardDescription>Detailed analysis of your tax calculation</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Income Details */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-peacock-blue">Income & Deductions</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span>Gross Income:</span>
                              <span className="font-medium">{formatCurrency(results.grossIncome)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Adjusted Gross Income:</span>
                              <span className="font-medium">{formatCurrency(results.adjustedGrossIncome)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Standard/Other deductions:</span>
                              <span className="font-medium">{formatCurrency(results.standardDeduction)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Taxable Income:</span>
                              <span>{formatCurrency(results.taxableIncome)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Tax Details */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-peacock-blue">Tax Liability</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span>Federal Income Tax:</span>
                              <span className="font-medium">{formatCurrency(results.federalTax)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold text-lg">
                              <span>Total Taxes:</span>
                              <span>{formatCurrency(results.totalTaxes)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Charts */}
                  <div className="grid grid-cols-1 gap-6">
                    <TaxResultsChart results={results} />
                  </div>

                  {/* Call to Action */}
                  <Card className="shadow-lg border-0 gradient-gold text-white">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-xl font-bold mb-2">
                        Verify your tax estimate with one of our best tax professionals for free
                      </h3>
                      <p className="text-gold-100 mb-6">
                        Get personalized advice and ensure accuracy in your tax planning
                      </p>
                      <a href="https://jayard9.sg-host.com/index.php/book-consultation/" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="secondary" className="bg-white text-luxor-gold hover:bg-gray-100">
                          Book A Consultation
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Disclaimers */}
          <Card className="shadow-lg border-0 mt-8">
            <CardContent className="p-6">
              <div className="text-xs text-muted-foreground space-y-2">
                <p className="font-semibold">Important Disclaimers:</p>
                <ul className="space-y-1 ml-4">
                  <li>• This calculator provides estimates based on 2024 tax year laws and may not reflect all tax situations.</li>
                  <li>• Results are for understanding purposes only and should not be considered as professional tax advice.</li>
                  <li>• Actual tax liability may vary based on additional factors not included in this calculator.</li>
                  <li>• Please consult with a qualified tax professional for accurate tax planning and filing.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};
