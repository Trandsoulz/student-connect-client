import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';
import { getFeedbackById, updateFeedback, Feedback } from '../api/feedbackService';
import { useAuth } from '../contexts/AuthContext';

export function FeedbackDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Resolved'>('Pending');
  const [response, setResponse] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!id) {
        toast.error('Invalid feedback ID');
        navigate(isAdmin ? '/manage-feedback' : '/my-feedbacks');
        return;
      }

      try {
        setIsLoading(true);
        const result = await getFeedbackById(id);
        setFeedback(result.data.feedback);
        setStatus(result.data.feedback.status);
        setResponse(result.data.feedback.adminResponse || '');
      } catch (error: any) {
        console.error('Error fetching feedback:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load feedback details';
        toast.error(errorMessage);
        navigate(isAdmin ? '/manage-feedback' : '/my-feedbacks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [id, isAdmin, navigate]);

  const statusColors = {
    'Pending': 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]',
    'In Progress': 'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]',
    'Resolved': 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]',
  };

  const handleUpdate = async () => {
    if (!feedback) return;

    if (isAdmin && !response.trim()) {
      toast.error('Please add a response before updating');
      return;
    }

    try {
      setIsUpdating(true);
      await updateFeedback(feedback._id, { status, adminResponse: response });
      toast.success(`Feedback status updated to ${status}`);
      
      // Navigate back to manage-feedback for admins
      if (isAdmin) {
        navigate('/manage-feedback');
      } else {
        // Refresh feedback data for students
        const result = await getFeedbackById(feedback._id);
        setFeedback(result.data.feedback);
      }
    } catch (error: any) {
      console.error('Error updating feedback:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update feedback';
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16">
          <div className="h-12 w-12 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading feedback details...</p>
        </div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="text-center py-16">
          <p className="text-muted-foreground">Feedback not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(isAdmin ? '/manage-feedback' : '/my-feedbacks')}
        className="text-[#1E88E5] hover:text-[#1565C0] hover:bg-[#E3F2FD]"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to List
      </Button>

      <Card className="p-8 border-border">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-border">
            <div className="flex-1">
              <h1 className="text-[#0D47A1] mb-2">{feedback.title}</h1>
              <div className="flex gap-4 text-muted-foreground">
                <span>Category: {feedback.category}</span>
                <span>•</span>
                <span>Submitted: {new Date(feedback.createdAt).toLocaleDateString()}</span>
                {feedback.studentId && typeof feedback.studentId === 'object' && (
                  <>
                    <span>•</span>
                    <span>By: {feedback.studentId.fullname}</span>
                  </>
                )}
              </div>
            </div>
            <Badge className={`${statusColors[status]} border`}>
              {status}
            </Badge>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-[#0D47A1]">Description</h3>
            <p className="text-foreground whitespace-pre-wrap bg-[#F5F7FA] p-4 rounded-lg">
              {feedback.description}
            </p>
          </div>

          {/* Admin Response Section */}
          <div className="space-y-4 pt-6 border-t border-border">
            <h3 className="text-[#0D47A1]">
              {isAdmin ? 'Admin Response' : 'Response from Administration'}
            </h3>

            {isAdmin ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="status">Update Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value: 'Pending' | 'In Progress' | 'Resolved') =>
                      setStatus(value)
                    }
                  >
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="response">Your Response</Label>
                  <Textarea
                    id="response"
                    placeholder="Add your response or comments here..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5] min-h-[150px]"
                  />
                </div>

                <Button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
                >
                  {isUpdating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Update Feedback
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="bg-[#F5F7FA] p-4 rounded-lg">
                {feedback.adminResponse ? (
                  <>
                    <p className="text-foreground whitespace-pre-wrap mb-4">{feedback.adminResponse}</p>
                    {feedback.respondedBy && typeof feedback.respondedBy === 'object' && (
                      <div className="text-sm text-muted-foreground border-t border-border pt-3">
                        <p>Responded by: {feedback.respondedBy.fullname}</p>
                        {feedback.respondedAt && (
                          <p>Responded at: {new Date(feedback.respondedAt).toLocaleString()}</p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground italic">
                    No response yet. The administration will review your feedback soon.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
