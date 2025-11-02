import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';
import { SendHorizontal } from 'lucide-react';
import { submitFeedback } from '../api/feedbackService';

export function SubmitFeedback() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitFeedback(formData);
      toast.success('Your feedback has been submitted successfully!');
      setFormData({ title: '', category: '', description: '' });
      
      // Navigate to my feedbacks page after successful submission
      setTimeout(() => {
        navigate('/my-feedbacks');
      }, 1500);
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit feedback. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-[#0D47A1]">Submit Feedback</h1>
        <p className="text-muted-foreground mt-2">
          Share your feedback or concerns with us
        </p>
      </div>

      <Card className="p-8 border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Brief summary of your feedback"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-input-background border-border">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Facility">Facility</SelectItem>
                <SelectItem value="Welfare">Welfare</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your feedback..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-input-background border-border focus:border-[#1E88E5] focus:ring-[#1E88E5] min-h-[200px]"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      <div className="bg-[#E3F2FD] rounded-lg p-6 border border-[#BBDEFB]">
        <h3 className="text-[#0D47A1] mb-2">Tips for Effective Feedback</h3>
        <ul className="space-y-2 text-[#1565C0]">
          <li>• Be specific and provide relevant details</li>
          <li>• Choose the most appropriate category</li>
          <li>• Keep your feedback constructive and respectful</li>
          <li>• You can track the status of your feedback in "My Feedbacks"</li>
        </ul>
      </div>
    </div>
  );
}
