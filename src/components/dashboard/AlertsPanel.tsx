import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, Info, CheckCircle, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const alerts = [
    {
        id: 1,
        type: "error",
        title: "5 Certificates Expiring Soon",
        description: "Action required within 30 days",
        icon: AlertTriangle,
        path: "/certificates"
    },
    {
        id: 2,
        type: "warning",
        title: "3 Pending Promotions",
        description: "Awaiting manager approval",
        icon: AlertCircle,
        path: "/promotions"
    },
    {
        id: 3,
        type: "info",
        title: "2 New Applications",
        description: "Review required for new hires",
        icon: Info,
        path: "/personnel"
    },
    {
        id: 4,
        type: "success",
        title: "All Staff Accounted",
        description: "No absences reported today",
        icon: CheckCircle,
        path: "/personnel"
    },
];

const getAlertStyles = (type: string) => {
    switch (type) {
        case "error":
            return "border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/10 dark:hover:bg-red-900/20";
        case "warning":
            return "border-orange-200 bg-orange-50 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-900/10 dark:hover:bg-orange-900/20";
        case "info":
            return "border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-900/10 dark:hover:bg-blue-900/20";
        case "success":
            return "border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-900/50 dark:bg-green-900/10 dark:hover:bg-green-900/20";
        default:
            return "hover:bg-accent";
    }
};

const getIconColor = (type: string) => {
    switch (type) {
        case "error":
            return "text-red-600 dark:text-red-400";
        case "warning":
            return "text-orange-600 dark:text-orange-400";
        case "info":
            return "text-blue-600 dark:text-blue-400";
        case "success":
            return "text-green-600 dark:text-green-400";
        default:
            return "";
    }
};

export function AlertsPanel() {
    const navigate = useNavigate();

    return (
        <Card className="relative z-10 bg-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                    <AlertTriangle className="h-5 w-5" />
                    Alerts & Notifications
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {alerts.map((alert) => {
                        const Icon = alert.icon;
                        return (
                            <Alert
                                key={alert.id}
                                className={cn(
                                    "cursor-pointer transition-colors duration-200 flex items-start gap-3",
                                    getAlertStyles(alert.type)
                                )}
                                onClick={() => navigate(alert.path)}
                            >
                                <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(alert.type)}`} />
                                <div className="flex-1">
                                    <AlertDescription className="flex items-center justify-between w-full">
                                        <div>
                                            <div className="font-semibold dark:text-white">{alert.title}</div>
                                            <div className="text-xs text-muted-foreground mt-0.5 dark:text-gray-400">
                                                {alert.description}
                                            </div>
                                        </div>
                                        <ChevronRight className={`h-4 w-4 opacity-50 ${getIconColor(alert.type)}`} />
                                    </AlertDescription>
                                </div>
                            </Alert>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
