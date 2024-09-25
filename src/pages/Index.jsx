import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Classroom Feedback</h1>
        <FeedbackForm />
        <FeedbackList />
      </div>
    </div>
  );
};

export default Index;
