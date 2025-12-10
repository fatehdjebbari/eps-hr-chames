import { UserPlus, ArrowRightLeft, Award, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'hire',
    message: 'New personnel added: Amina Khelifa',
    time: '2 hours ago',
    icon: UserPlus,
  },
  {
    id: 2,
    type: 'transfer',
    message: 'Ahmed Benali transferred to Cardiology',
    time: '5 hours ago',
    icon: ArrowRightLeft,
  },
  {
    id: 3,
    type: 'promotion',
    message: 'Karim Hadj promoted to Médecin Chef',
    time: '1 day ago',
    icon: Award,
  },
  {
    id: 4,
    type: 'certificate',
    message: 'Work certificate issued for Fatima Zeroual',
    time: '2 days ago',
    icon: FileCheck,
  },
];

const iconStyles = {
  hire: 'bg-success/10 text-success',
  transfer: 'bg-accent/10 text-accent',
  promotion: 'bg-warning/10 text-warning',
  certificate: 'bg-primary/10 text-primary',
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              iconStyles[activity.type as keyof typeof iconStyles]
            )}>
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-card-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
