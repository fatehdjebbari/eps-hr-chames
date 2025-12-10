import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  trend?: number;
  gradient?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  trend,
  gradient = "from-blue-500 to-cyan-500"
}: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    return trend >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-lg bg-gradient-to-br",
          gradient
        )}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold dark:text-white">{value}</div>
          {trend !== undefined && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={cn(
                "text-xs font-medium",
                trend >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            changeType === "positive" && "text-green-600 dark:text-green-400",
            changeType === "negative" && "text-red-600 dark:text-red-400",
            changeType === "neutral" && "text-muted-foreground dark:text-gray-400"
          )}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
