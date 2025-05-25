using CommonLibrary.Models;

namespace dotnetapp4.Services
{
    public interface IFeedbackService
    {
        Task<bool> AddFeedback(Feedback feedback);
        Task<bool> DeleteFeedback(int feedbackId);
        Task<IEnumerable<Feedback>> GetAllFeedbacks();
        Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId);
    }
}