import apiClient from './client';

export interface Feedback {
  _id: string;
  title: string;
  category: 'Academic' | 'Facility' | 'Welfare' | 'Technology' | 'Administration' | 'Other';
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  studentId: {
    _id: string;
    fullname: string;
    email: string;
  };
  adminResponse?: string;
  respondedBy?: {
    _id: string;
    fullname: string;
    email: string;
  };
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitFeedbackData {
  title: string;
  category: string;
  description: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  data: {
    feedback: Feedback;
  };
}

export interface FeedbackListResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    feedbacks: Feedback[];
  };
}

/**
 * Submit new feedback
 */
export const submitFeedback = async (feedbackData: SubmitFeedbackData): Promise<FeedbackResponse> => {
  const response = await apiClient.post<FeedbackResponse>('/api/feedback/submit', feedbackData);
  return response.data;
};

/**
 * Get student's own feedbacks
 */
export const getMyFeedbacks = async (): Promise<FeedbackListResponse> => {
  const response = await apiClient.get<FeedbackListResponse>('/api/feedback/my-feedbacks');
  return response.data;
};

/**
 * Get all feedbacks (Admin only)
 */
export const getAllFeedbacks = async (): Promise<FeedbackListResponse> => {
  const response = await apiClient.get<FeedbackListResponse>('/api/feedback/all');
  return response.data;
};

/**
 * Get single feedback by ID
 */
export const getFeedbackById = async (id: string): Promise<FeedbackResponse> => {
  const response = await apiClient.get<FeedbackResponse>(`/api/feedback/${id}`);
  return response.data;
};

/**
 * Update feedback (Admin only)
 */
export const updateFeedback = async (
  id: string,
  data: { status?: string; adminResponse?: string }
): Promise<FeedbackResponse> => {
  const response = await apiClient.put<FeedbackResponse>(`/api/feedback/${id}`, data);
  return response.data;
};

/**
 * Delete feedback (Admin only)
 */
export const deleteFeedback = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(`/api/feedback/${id}`);
  return response.data;
};
