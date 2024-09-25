const logFeedbackSubmission = (feedback) => {
  console.log(`New ${feedback.type} feedback submitted at ${feedback.timestamp}`);
  // In a real application, you might want to send this log to a server or external logging service
};

export { logFeedbackSubmission };