
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, DollarSign, HelpCircle, PieChart, TrendingUp } from 'lucide-react';
import { calculateTaxes, TaxCalculationInput, TaxCalculationResult } from '@/utils/taxCalculations';
import { TaxResultsChart } from '@/components/TaxResultsChart';

const FILING_STATUS_OPTIONS = [
  { value: 'single', label: 'Single', standardDeduction: 14600 },
  { value: 'marriedFilingJointly', label: 'Married Filing Jointly', standardDeduction: 29200 },
  { value: 'marriedFilingSeparately', label: 'Married Filing Separately', standardDeduction: 14600 },
  { value: 'headOfHousehold', label: 'Head of Household', standardDeduction: 21900 },
  { value: 'qualifyingSurvivingSpouse', label: 'Qualifying Surviving Spouse', standardDeduction: 29200 }
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
  const [standardDeduction, setStandardDeduction] = useState<number>(14600);
  const [isUsingItemized, setIsUsingItemized] = useState<boolean>(false);

  useEffect(() => {
    // Calculate standard deduction based on filing status
    const selectedOption = FILING_STATUS_OPTIONS.find(option => option.value === formData.filingStatus);
    const currentStandardDeduction = selectedOption ? selectedOption.standardDeduction : 14600;
    setStandardDeduction(currentStandardDeduction);
    
    // Calculate itemized deductions
    let itemizedDeductions = formData.otherDeductions;
    if (formData.hasCharitableDeductions) {
      itemizedDeductions += formData.charitableDeductions;
    }
    
    // Determine if using itemized or standard deduction
    const usingItemized = itemizedDeductions > currentStandardDeduction;
    setIsUsingItemized(usingItemized);

    if (formData.income > 0) {
      const calculatedResults = calculateTaxes(formData);
      setResults(calculatedResults);
    }
  }, [formData]);

  const handleInputChange = (field: keyof TaxCalculationInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilingStatusChange = (filingStatus: string) => {
    setFormData(prev => ({
      ...prev,
      filingStatus: filingStatus
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
          <div className={`grid gap-6 ${results ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {/* Input Form */}
            <div className={`space-y-6 ${results ? 'lg:col-span-1' : 'max-w-4xl mx-auto'}`}>
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
                      maxLength={22}
                      placeholder="Enter your annual income"
                      value={formData.income || ''}
                      onChange={(e) => handleInputChange('income', Number(e.target.value))}
                      className="text-lg h-10"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Filing Status</Label>
                    <RadioGroup 
                      value={formData.filingStatus} 
                      onValueChange={handleFilingStatusChange}
                      className="space-y-2"
                    >
                      {FILING_STATUS_OPTIONS.map((option) => (
                        <div key={option.value} className="flex items-center justify-between space-x-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ${option.standardDeduction.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Deductions & Adjustments</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="otherDeductions">Other/Itemized Deduction</Label>
                      <Input
                        id="otherDeductions"
                        type="number"
                        min="0"
                        maxLength={22}
                        placeholder="Additional deductions beyond standard"
                        value={formData.otherDeductions || ''}
                        onChange={(e) => handleInputChange('otherDeductions', Number(e.target.value))}
                        className="h-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="shadow-lg border-0 gradient-gold text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-3">
                    Verify your tax estimate with one of our best tax professionals for free
                  </h3>
                  <p className="text-gold-100 mb-6 text-sm">
                    Get personalized advice and ensure accuracy in your tax planning
                  </p>
                  <a href="https://jayard9.sg-host.com/index.php/book-consultation/" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="secondary" className="bg-white text-luxor-gold hover:bg-gray-100 text-base px-6 py-3 h-auto">
                      Book A Consultation
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            {results && (
              <div className="lg:col-span-2 space-y-6">
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
                          {!isUsingItemized && (
                            <div className="flex justify-between">
                              <span>Standard Deduction:</span>
                              <span className="font-medium">{formatCurrency(standardDeduction)}</span>
                            </div>
                          )}
                          {isUsingItemized && (
                            <div className="flex justify-between">
                              <span>Other/Itemized Deduction:</span>
                              <span className="font-medium">{formatCurrency(formData.otherDeductions)}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span>Deduction Used:</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{formatCurrency(results.standardDeduction)}</span>
                              <Badge variant={isUsingItemized ? "default" : "secondary"} className="text-xs">
                                {isUsingItemized ? "Itemized" : "Standard"}
                              </Badge>
                            </div>
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
                  <TaxResultsChart results={results} effectiveDeductions={results.standardDeduction} />
                </div>
              </div>
            )}
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
