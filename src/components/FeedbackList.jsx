import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const fetchFeedback = async () => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return JSON.parse(localStorage.getItem('feedback') || '[]');
};

const FeedbackList = () => {
  const { data: feedbackList, isLoading, error } = useQuery({
    queryKey: ['feedback'],
    queryFn: fetchFeedback,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        feedbackList.map((feedback) => (
          <Card key={feedback.id} className="mb-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${feedback.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback.type === 'positive' ? 'Positive' : 'Negative'} Feedback
                </span>
                <span className="text-sm text-gray-500">{new Date(feedback.timestamp).toLocaleString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p>{feedback.comment}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default FeedbackList;