import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
}

export function StatsCard({ title, value, icon: Icon, gradient }: StatsCardProps) {
  return (
    <Card className="p-6 border-border hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground">{title}</p>
          <p className="text-[#0D47A1]">{value}</p>
        </div>
        <div className={`h-12 w-12 rounded-lg ${gradient} flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );
}
