import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { mockDepartments } from '@/data/mockData';

const COLORS = [
  'hsl(175, 60%, 40%)',
  'hsl(205, 75%, 55%)',
  'hsl(152, 60%, 42%)',
  'hsl(38, 92%, 50%)',
  'hsl(280, 60%, 55%)',
  'hsl(340, 70%, 55%)',
];

const data = mockDepartments.map((dept) => ({
  name: dept.name,
  value: dept.headCount,
}));

export function DepartmentChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up overflow-hidden" style={{ animationDelay: '0.2s' }}>
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Staff by Department</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
            />
            <Legend
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
