import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
    { day: "Sun", personnel: 28, active: 24 },
    { day: "Mon", personnel: 45, active: 42 },
    { day: "Tue", personnel: 12, active: 10 },
    { day: "Wed", personnel: 35, active: 32 },
    { day: "Thu", personnel: 8, active: 7 },
    { day: "Fri", personnel: 52, active: 48 },
    { day: "Sat", personnel: 30, active: 28 },
    { day: "Sun", personnel: 18, active: 16 },
];

export function PersonnelTrendChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="dark:text-white">Personnel Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPersonnel" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis
                            dataKey="day"
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
                        <Area
                            type="monotone"
                            dataKey="personnel"
                            stroke="#10b981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPersonnel)"
                            name="Dataset 1"
                        />
                        <Area
                            type="monotone"
                            dataKey="active"
                            stroke="#84cc16"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorActive)"
                            name="Dataset 2"
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-sm text-muted-foreground dark:text-gray-400">Dataset 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-lime-500"></div>
                        <span className="text-sm text-muted-foreground dark:text-gray-400">Dataset 2</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
