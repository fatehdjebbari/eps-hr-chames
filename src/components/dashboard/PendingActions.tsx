import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, AlertTriangle, ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function PendingActions() {
    const navigate = useNavigate();

    const pendingItems = [
        {
            id: 1,
            type: "leave_request",
            person: "Sarah Hamidi",
            details: "Sick Leave (2 days)",
            date: "Today, 09:00 AM",
            urgency: "high",
            path: "/personnel" // Ideally this would link to a leave requests page
        },
        {
            id: 2,
            type: "certificate",
            person: "Mohamed Amine",
            details: "Work Certificate Request",
            date: "Yesterday, 4:30 PM",
            urgency: "medium",
            path: "/certificates"
        },
        {
            id: 3,
            type: "contract",
            person: "Rachid Belkacem",
            details: "Contract exp. in 5 days",
            date: "Due: Dec 15",
            urgency: "high",
            path: "/personnel?id=2&tab=contracts"
        },
        {
            id: 4,
            type: "salary_request",
            person: "Houria Hamidi",
            details: "Salary increase request (+15%)",
            date: "Today, 11:30 AM",
            urgency: "medium",
            path: "/personnel?id=8&tab=salary"
        }
    ];

    const handleAction = (e: React.MouseEvent, action: string) => {
        e.stopPropagation(); // Prevent row click
        // In a real app, this would trigger the approval/rejection logic
        console.log(`${action} item`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Pending Actions
                    <span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {pendingItems.length} pending
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {pendingItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-2 rounded-lg border bg-card/50 hover:bg-primary/10 cursor-pointer transition-colors group"
                            onClick={() => navigate(item.path)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 p-2 rounded-full bg-opacity-10 ${item.type === 'leave_request' ? 'bg-blue-500 text-blue-500' :
                                    item.type === 'contract' ? 'bg-red-500 text-red-500' :
                                        item.type === 'salary_request' ? 'bg-green-500 text-green-500' :
                                            'bg-purple-500 text-purple-500'
                                    }`}>
                                    {item.type === 'leave_request' && <Clock className="h-4 w-4" />}
                                    {item.type === 'contract' && <AlertTriangle className="h-4 w-4" />}
                                    {item.type === 'certificate' && <FileText className="h-4 w-4" />}
                                    {item.type === 'salary_request' && <Clock className="h-4 w-4" />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{item.person}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-xs text-muted-foreground hover:text-primary">
                    View all pending items
                </Button>
            </CardContent>
        </Card>
    );
}
