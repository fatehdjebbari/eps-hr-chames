import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, AlertTriangle, Award, FileCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const upcomingEvents = [
    {
        id: 1,
        title: "Medical License Renewal",
        person: "Dr. Ahmed Benali",
        date: "2025-01-15",
        type: "certificate",
        priority: "high",
        icon: FileCheck,
    },
    {
        id: 2,
        title: "Promotion Review",
        person: "Nurse Fatima Zahra",
        date: "2025-01-20",
        type: "promotion",
        priority: "medium",
        icon: Award,
    },
    {
        id: 3,
        title: "Contract Renewal",
        person: "Dr. Karim Mansouri",
        date: "2025-01-25",
        type: "contract",
        priority: "high",
        icon: Calendar,
    },
    {
        id: 4,
        title: "Training Certification",
        person: "Lab Tech Sarah",
        date: "2025-02-01",
        type: "training",
        priority: "low",
        icon: FileCheck,
    },
];

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        case "medium":
            return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
        case "low":
            return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        default:
            return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
};

const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export function UpcomingEvents() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {upcomingEvents.map((event) => {
                        const daysUntil = getDaysUntil(event.date);
                        const Icon = event.icon;

                        return (
                            <div
                                key={event.id}
                                className="flex items-start gap-3 p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-medium dark:text-white">{event.title}</p>
                                            <p className="text-sm text-muted-foreground dark:text-gray-400">
                                                {event.person}
                                            </p>
                                        </div>
                                        <Badge className={getPriorityColor(event.priority)}>
                                            {event.priority}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground dark:text-gray-400">
                                        <Clock className="h-3 w-3" />
                                        <span>
                                            {daysUntil > 0
                                                ? `${daysUntil} days`
                                                : daysUntil === 0
                                                    ? "Today"
                                                    : "Overdue"}
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
