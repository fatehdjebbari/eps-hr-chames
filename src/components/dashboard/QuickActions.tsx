import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, TrendingUp, FileText, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        {
            title: "Add Personnel",
            description: "Register new employee",
            icon: UserPlus,
            color: "from-blue-500 to-cyan-500",
            action: () => navigate("/personnel"),
        },
        {
            title: "Process Promotion",
            description: "Review pending promotions",
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500",
            action: () => navigate("/promotions"),
        },
        {
            title: "View Reports",
            description: "Generate HR reports",
            icon: FileText,
            color: "from-green-500 to-emerald-500",
            action: () => navigate("/archives"),
        },
        {
            title: "Manage Certificates",
            description: "Track certifications",
            icon: Award,
            color: "from-orange-500 to-red-500",
            action: () => navigate("/certificates"),
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="group relative overflow-hidden rounded-lg border dark:border-gray-700 p-4 text-left transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
                                    <action.icon className="h-5 w-5 text-white" />
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="font-semibold mb-1 dark:text-white">{action.title}</h3>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">
                                {action.description}
                            </p>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
