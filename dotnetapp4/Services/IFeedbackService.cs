using CommonLibrary.Models;

namespace dotnetapp4.Services
{
    public interface IFeedbackService
    {
        Task<bool> AddFeeback(Feedback feedback);
        Task<bool> DeleteFeeback(int feedbackId);
        Task<IEnumerable<Feedback>> GetAllFeedbacks();
        Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId);
    }
}
