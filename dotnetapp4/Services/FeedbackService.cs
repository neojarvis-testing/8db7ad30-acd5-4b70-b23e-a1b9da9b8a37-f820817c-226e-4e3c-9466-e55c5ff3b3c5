using CommonLibrary.Models;
using dotnetapp1.Data;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp4.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly ApplicationDbContext _context;

        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddFeedback(Feedback feedback)
        {
            feedback.Date = DateTime.UtcNow; 
            await _context.Feedbacks.AddAsync(feedback);
            int rowsAffected = await _context.SaveChangesAsync();
            return rowsAffected == 1;
        }

        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback == null)
                return false;

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks.Include(x=>x.User).ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _context.Feedbacks
                .Include(x => x.User)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }
    }
}