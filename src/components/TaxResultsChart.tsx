

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TaxCalculationResult } from '@/utils/taxCalculations';

interface TaxResultsChartProps {
  results: TaxCalculationResult;
  effectiveDeductions: number;
}

export const TaxResultsChart: React.FC<TaxResultsChartProps> = ({ results, effectiveDeductions }) => {
  const data = [
    {
      name: 'Income Tax',
      value: results.federalTax + results.stateTax,
      color: '#0D6E98' // Peacock blue
    },
    {
      name: 'Deductions',
      value: effectiveDeductions,
      color: '#dc2626' // Red
    },
    {
      name: 'Taxable Income',
      value: results.taxableIncome,
      color: '#7c3aed' // Purple
    },
    {
      name: 'Net Income',
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
          How your gross income is allocated across taxes, deductions, and take-home pay
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
          <div className="flex flex-col justify-center space-y-3">
            <div>
              <div className="font-semibold text-muted-foreground text-xs">Income Tax:</div>
              <div className="text-base font-bold" style={{ color: '#0D6E98' }}>
                {formatCurrency(results.federalTax + results.stateTax)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-muted-foreground text-xs">Deductions:</div>
              <div className="text-base font-bold" style={{ color: '#dc2626' }}>
                {formatCurrency(effectiveDeductions)}
              </div>
            </div>
            <div>
              <div className="font-semibold text-muted-foreground text-xs">Taxable Income:</div>
              <div className="text-base font-bold" style={{ color: '#7c3aed' }}>
                {formatCurrency(results.taxableIncome)}
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="font-semibold text-muted-foreground text-xs">Net Income</div>
              <div className="text-lg font-bold" style={{ color: '#22c55e' }}>
                {formatCurrency(results.netIncome)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

