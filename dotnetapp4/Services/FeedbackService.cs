using CommonLibrary.Models;
using dotnetapp4.Data;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp4.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly FeedbackDbContext _context;

        public FeedbackService(FeedbackDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddFeeback(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
            int rowsAffected = _context.SaveChanges();
            return rowsAffected == 1;
        }

        public async Task<bool> DeleteFeeback(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback != null)
            {
                _context.Feedbacks.Remove(feedback);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks.ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _context.Feedbacks.Where(x=>x.UserId == userId).ToListAsync();
        }
    }
}
