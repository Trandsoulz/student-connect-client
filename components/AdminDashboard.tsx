import { useState, useEffect } from 'react';
import { FileText, Clock, TrendingUp, CheckCircle, Loader2 } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Card } from './ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { getAllFeedbacks, Feedback } from '../api/feedbackService';
import { toast } from 'sonner';

export function AdminDashboard() {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#1E88E5]" />
      </div>
    );
  }

  const totalFeedback = feedbacks.length;
  const pendingFeedback = feedbacks.filter((f) => f.status === 'Pending').length;
  const inProgressFeedback = feedbacks.filter((f) => f.status === 'In Progress').length;
  const resolvedFeedback = feedbacks.filter((f) => f.status === 'Resolved').length;

  // Category distribution data
  const categoryData = [
    {
      name: 'Academic',
      count: feedbacks.filter((f) => f.category === 'Academic').length,
    },
    {
      name: 'Facility',
      count: feedbacks.filter((f) => f.category === 'Facility').length,
    },
    {
      name: 'Welfare',
      count: feedbacks.filter((f) => f.category === 'Welfare').length,
    },
    {
      name: 'Technology',
      count: feedbacks.filter((f) => f.category === 'Technology').length,
    },
    {
      name: 'Admin/Other',
      count: feedbacks.filter((f) => f.category === 'Administration' || f.category === 'Other').length,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[#0D47A1]">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of all feedback submissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Feedback"
          value={totalFeedback}
          icon={FileText}
          gradient="bg-gradient-to-br from-[#1E88E5] to-[#42A5F5]"
        />
        <StatsCard
          title="Pending"
          value={pendingFeedback}
          icon={Clock}
          gradient="bg-gradient-to-br from-[#42A5F5] to-[#64B5F6]"
        />
        <StatsCard
          title="In Progress"
          value={inProgressFeedback}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-[#64B5F6] to-[#90CAF9]"
        />
        <StatsCard
          title="Resolved"
          value={resolvedFeedback}
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-[#90CAF9] to-[#0097A7]"
        />
      </div>

      {/* Analytics Chart */}
      <Card className="p-6 border-border">
        <h2 className="text-[#0D47A1] mb-6">Feedback by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#BBDEFB" />
            <XAxis dataKey="name" stroke="#1565C0" />
            <YAxis stroke="#1565C0" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #BBDEFB',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="#1E88E5" name="Number of Feedbacks" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 border-border">
        <h2 className="text-[#0D47A1] mb-4">Quick Stats</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-muted-foreground">Status Distribution</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Pending</span>
                <span className="text-[#1E88E5]">
                  {totalFeedback > 0 ? Math.round((pendingFeedback / totalFeedback) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">In Progress</span>
                <span className="text-[#1E88E5]">
                  {totalFeedback > 0 ? Math.round((inProgressFeedback / totalFeedback) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Resolved</span>
                <span className="text-[#1E88E5]">
                  {totalFeedback > 0 ? Math.round((resolvedFeedback / totalFeedback) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-muted-foreground">Resolution Rate</h4>
            <div className="text-center">
              <div className="text-[#0D47A1] mb-2">
                {totalFeedback > 0 ? Math.round((resolvedFeedback / totalFeedback) * 100) : 0}%
              </div>
              <p className="text-muted-foreground">
                {resolvedFeedback} of {totalFeedback} feedbacks resolved
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
