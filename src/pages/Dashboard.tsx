import { Users, Building2, Award, TrendingUp, UserCheck, AlertCircle } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { PendingActions } from '@/components/dashboard/PendingActions';
import { MonthlyActivityChart } from '@/components/dashboard/MonthlyActivityChart';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { mockPersonnel, mockDepartments } from '@/data/mockData';

export default function Dashboard() {
  const totalPersonnel = mockPersonnel.length;
  const activePersonnel = mockPersonnel.filter(p => p.status === 'active').length;
  const totalDepartments = mockDepartments.length;
  const onLeave = mockPersonnel.filter(p => p.status === 'on_leave').length;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in duration-500">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Good Morning, Admin
            </h2>
            <p className="text-muted-foreground mt-1">
              Here's what's happening in your organization today.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {currentDate}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Personnel"
            value={totalPersonnel}
            change="+2 this month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Active Staff"
            value={activePersonnel}
            change={`${Math.round((activePersonnel / totalPersonnel) * 100)}% of total`}
            changeType="positive"
            icon={UserCheck}
          />
          <StatCard
            title="Departments"
            value={totalDepartments}
            change="All operational"
            changeType="positive"
            icon={Building2}
          />
          <StatCard
            title="On Leave"
            value={onLeave}
            change="Currently absent"
            changeType="neutral"
            icon={AlertCircle}
          />
        </div>

        {/* Quick Actions (Prominent) */}
        <div className="grid gap-6">
          <QuickActions />
        </div>

        {/* Actionable Items Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <PendingActions />
          <AlertsPanel />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column (Charts - Takes 2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <DepartmentChart />
              <MonthlyActivityChart />
            </div>
          </div>

          {/* Right Column (Activity - Takes 1/3 width) */}
          <div className="space-y-6">
            <UpcomingEvents />
            <RecentActivity />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
