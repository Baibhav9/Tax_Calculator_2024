
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TaxCalculationResult } from '@/utils/taxCalculations';

interface TaxBracketChartProps {
  results: TaxCalculationResult;
}

export const TaxBracketChart: React.FC<TaxBracketChartProps> = ({ results }) => {
  const data = results.taxBracketDetails.map((bracket, index) => ({
    bracket: `${(bracket.rate * 100).toFixed(0)}%`,
    taxOwed: bracket.taxOwed,
    taxableAmount: bracket.taxableAmount,
    rate: bracket.rate * 100
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-peacock-blue">{label} Tax Bracket</p>
          <p className="text-sm">
            Tax on: {formatCurrency(data.taxableAmount)}
          </p>
          <p className="text-sm font-semibold">
            Tax owed: {formatCurrency(data.taxOwed)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Federal Tax by Bracket</CardTitle>
        <CardDescription>
          Amount of tax owed in each federal tax bracket
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="bracket" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="taxOwed" 
                fill="#1B8CBC"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            Marginal Tax Rate: <span className="font-semibold text-peacock-blue">
              {results.marginalTaxRate.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
