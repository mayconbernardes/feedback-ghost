import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { logFeedbackSubmission } from '../utils/logger';

const FeedbackForm = () => {
  const [feedbackType, setFeedbackType] = useState('positive');
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const submitFeedback = async (feedback) => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Store feedback in localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    localStorage.setItem('feedback', JSON.stringify([feedback, ...existingFeedback]));
    
    // Log the feedback submission
    logFeedbackSubmission(feedback);
    
    return feedback;
  };

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      setFeedbackType('positive');
      setComment('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      id: Date.now(),
      type: feedbackType,
      comment,
      timestamp: new Date().toISOString(),
    };
    mutation.mutate(feedback);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
      <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="mb-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="positive" id="positive" />
          <Label htmlFor="positive">Positive</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="negative" id="negative" />
          <Label htmlFor="negative">Negative</Label>
        </div>
      </RadioGroup>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your feedback here..."
        className="mb-4"
        rows={4}
      />
      <Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
};

export default FeedbackForm;