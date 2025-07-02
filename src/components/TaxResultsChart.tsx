
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TaxCalculationResult } from '@/utils/taxCalculations';

interface TaxResultsChartProps {
  results: TaxCalculationResult;
}

export const TaxResultsChart: React.FC<TaxResultsChartProps> = ({ results }) => {
  const data = [
    {
      name: 'Federal Tax',
      value: results.federalTax,
      color: '#0D6E98' // Peacock blue
    },
    {
      name: 'State Tax',
      value: results.stateTax,
      color: '#B58537' // Luxor gold
    },
    {
      name: 'Social Security',
      value: results.socialSecurityTax,
      color: '#dc2626' // Red
    },
    {
      name: 'Medicare',
      value: results.medicareTax + results.additionalMedicareTax,
      color: '#7c3aed' // Purple
    },
    {
      name: 'Take-Home Pay',
      value: results.netIncome,
      color: '#22c55e' // Green
    }
  ].filter(item => item.value > 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / results.grossIncome) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold" style={{ color: data.payload.color }}>
            {data.payload.name}
          </p>
          <p className="text-sm">
            {formatCurrency(data.value)} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Income Distribution</CardTitle>
        <CardDescription>
          How your gross income is allocated across taxes and take-home pay
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Section */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry: any) => (
                    <span style={{ color: entry.color, fontSize: '12px' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats Section */}
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <div className="font-semibold text-muted-foreground text-sm">Gross Income:</div>
              <div className="text-xl font-bold" style={{ color: '#22c55e' }}>
                {formatCurrency(results.grossIncome)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-muted-foreground text-sm">Adjusted Gross Income:</div>
              <div className="text-xl font-bold" style={{ color: '#22c55e' }}>
                {formatCurrency(results.adjustedGrossIncome)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-muted-foreground text-sm">Standard/Other deductions:</div>
              <div className="text-xl font-bold" style={{ color: '#B58537' }}>
                {formatCurrency(results.standardDeduction)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-muted-foreground text-sm">Federal Income Tax:</div>
              <div className="text-xl font-bold" style={{ color: '#0D6E98' }}>
                {formatCurrency(results.federalTax)}
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="font-semibold text-muted-foreground text-sm">Total Taxes</div>
              <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>
                {formatCurrency(results.totalTaxes)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-muted-foreground text-sm">Effective Rate</div>
              <div className="text-2xl font-bold" style={{ color: '#7c3aed' }}>
                {results.effectiveTaxRate.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
