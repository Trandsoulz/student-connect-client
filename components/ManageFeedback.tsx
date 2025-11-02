import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { getAllFeedbacks, Feedback } from '../api/feedbackService';
import { toast } from 'sonner';

export function ManageFeedback() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await getAllFeedbacks();
        setFeedbacks(response.data.feedbacks);
      } catch (error: any) {
        console.error('Error fetching feedbacks:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch feedbacks');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (statusFilter === 'all') return true;
    return feedback.status === statusFilter;
  });

  const statusColors = {
    'Pending': 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]',
    'In Progress': 'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]',
    'Resolved': 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#1E88E5]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0D47A1]">Manage Feedback</h1>
          <p className="text-muted-foreground mt-2">
            Review and respond to student feedback
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <label className="text-foreground">Filter by status:</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Feedback Table */}
      {filteredFeedbacks.length > 0 ? (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3F2FD] hover:bg-[#E3F2FD]">
                <TableHead className="text-[#0D47A1]">Student Name</TableHead>
                <TableHead className="text-[#0D47A1]">Title</TableHead>
                <TableHead className="text-[#0D47A1]">Category</TableHead>
                <TableHead className="text-[#0D47A1]">Status</TableHead>
                <TableHead className="text-[#0D47A1]">Submitted Date</TableHead>
                <TableHead className="text-[#0D47A1]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback._id} className="hover:bg-[#F5F7FA]">
                  <TableCell className="text-foreground">
                    {typeof feedback.studentId === 'object' ? feedback.studentId.fullname : 'Unknown Student'}
                  </TableCell>
                  <TableCell className="text-foreground max-w-xs truncate">{feedback.title}</TableCell>
                  <TableCell className="text-foreground">{feedback.category}</TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[feedback.status]} border`}>
                      {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/feedback/${feedback._id}`)}
                      className="text-[#1E88E5] hover:text-[#1565C0] hover:bg-[#E3F2FD]"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground">
            {statusFilter === 'all'
              ? 'No feedback submitted yet'
              : `No feedback with status "${statusFilter}"`}
          </p>
        </div>
      )}
    </div>
  );
}
