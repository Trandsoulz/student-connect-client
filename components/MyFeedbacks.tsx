import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackCard } from './FeedbackCard';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { getMyFeedbacks, Feedback } from '../api/feedbackService';

export function MyFeedbacks() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setIsLoading(true);
        const response = await getMyFeedbacks();
        setFeedbacks(response.data.feedbacks);
      } catch (error: any) {
        console.error('Error fetching feedbacks:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load feedbacks';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (statusFilter === 'all') return true;
    return feedback.status === statusFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0D47A1]">My Feedbacks</h1>
          <p className="text-muted-foreground mt-2">
            View and track all your submitted feedback
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

      {/* Feedback List */}
      {isLoading ? (
        <div className="text-center py-16 bg-card rounded-lg border border-border">
          <div className="h-12 w-12 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your feedbacks...</p>
        </div>
      ) : filteredFeedbacks.length > 0 ? (
        <div className="grid gap-4">
          {filteredFeedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback._id}
              id={Number(feedback._id.slice(-6))} // Convert MongoDB ObjectId to displayable number
              title={feedback.title}
              category={feedback.category}
              description={feedback.description}
              status={feedback.status}
              date={new Date(feedback.createdAt).toLocaleDateString()}
              onClick={() => navigate(`/feedback/${feedback._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg border border-border">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-[#0D47A1] mb-2">No feedback found</h3>
          <p className="text-muted-foreground mb-6">
            {statusFilter === 'all'
              ? "You haven't submitted any feedback yet"
              : `No feedback with status "${statusFilter}"`}
          </p>
          {statusFilter === 'all' && (
            <Button
              onClick={() => navigate('/submit')}
              className="bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
            >
              Submit Feedback
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
