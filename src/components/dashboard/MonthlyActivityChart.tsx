import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
    { month: "Jan", hires: 4, promotions: 2 },
    { month: "Feb", hires: 3, promotions: 1 },
    { month: "Mar", hires: 5, promotions: 3 },
    { month: "Apr", hires: 2, promotions: 2 },
    { month: "May", hires: 6, promotions: 4 },
    { month: "Jun", hires: 4, promotions: 2 },
];

export function MonthlyActivityChart() {
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="dark:text-white">Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis
                            dataKey="month"
                            stroke="#9ca3af"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Bar dataKey="hires" fill="#3b82f6" radius={[8, 8, 0, 0]} name="New Hires" />
                        <Bar dataKey="promotions" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Promotions" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-muted-foreground dark:text-gray-400">New Hires</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm text-muted-foreground dark:text-gray-400">Promotions</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
