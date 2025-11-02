import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface FeedbackCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  date: string;
  studentName?: string;
  onClick: () => void;
}

export function FeedbackCard({
  title,
  category,
  description,
  status,
  date,
  studentName,
  onClick,
}: FeedbackCardProps) {
  const statusColors = {
    'Pending': 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]',
    'In Progress': 'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]',
    'Resolved': 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]',
  };

  return (
    <Card
      className="p-6 border-border hover:shadow-lg transition-all cursor-pointer hover:border-[#1E88E5]"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-[#0D47A1] mb-1">{title}</h3>
            <p className="text-muted-foreground">{category}</p>
          </div>
          <Badge className={`${statusColors[status]} border`}>
            {status}
          </Badge>
        </div>
        
        <p className="text-foreground line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {studentName && (
            <span className="text-muted-foreground">Student: {studentName}</span>
          )}
          <span className="text-muted-foreground">{date}</span>
        </div>
      </div>
    </Card>
  );
}
