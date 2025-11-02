import { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { StatsCard } from './StatsCard';
import { FeedbackCard } from './FeedbackCard';
import { toast } from 'sonner';
import { getMyFeedbacks, Feedback } from '../api/feedbackService';

export function StudentDashboard() {
  const navigate = useNavigate();
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
        const errorMessage = error.response?.data?.message || 'Failed to load dashboard data';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);
  
  const totalSubmissions = feedbacks.length;
  const pendingFeedback = feedbacks.filter((f) => f.status === 'Pending').length;
  const resolvedFeedback = feedbacks.filter((f) => f.status === 'Resolved').length;

  const recentFeedbacks = feedbacks.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0D47A1]">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your feedback submissions
          </p>
        </div>
        <Button
          onClick={() => navigate('/submit')}
          className="bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Submit New Feedback
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <div className="h-32 bg-card rounded-lg border border-border animate-pulse" />
            <div className="h-32 bg-card rounded-lg border border-border animate-pulse" />
            <div className="h-32 bg-card rounded-lg border border-border animate-pulse" />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Submissions"
              value={totalSubmissions}
              icon={FileText}
              gradient="bg-gradient-to-br from-[#1E88E5] to-[#42A5F5]"
            />
            <StatsCard
              title="Pending Feedback"
              value={pendingFeedback}
              icon={Clock}
              gradient="bg-gradient-to-br from-[#42A5F5] to-[#64B5F6]"
            />
            <StatsCard
              title="Resolved Feedback"
              value={resolvedFeedback}
              icon={CheckCircle}
              gradient="bg-gradient-to-br from-[#64B5F6] to-[#0097A7]"
            />
          </>
        )}
      </div>

      {/* Recent Feedback */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[#0D47A1]">Recent Feedback</h2>
          <Button
            variant="ghost"
            onClick={() => navigate('/my-feedbacks')}
            className="text-[#1E88E5] hover:text-[#1565C0] hover:bg-[#E3F2FD]"
          >
            View All
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <div className="h-12 w-12 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your feedbacks...</p>
          </div>
        ) : recentFeedbacks.length > 0 ? (
          <div className="grid gap-4">
            {recentFeedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback._id}
                id={Number(feedback._id.slice(-6))}
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
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No feedback submitted yet</p>
            <Button
              onClick={() => navigate('/submit')}
              className="mt-4 bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
            >
              Submit Your First Feedback
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
