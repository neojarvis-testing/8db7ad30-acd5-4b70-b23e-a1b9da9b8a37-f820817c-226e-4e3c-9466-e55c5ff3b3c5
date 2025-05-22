using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp4.Services
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackService : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public FeedbackService(ApplicationDbContext context)
        {
            this._context = context;            
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return this._context.Feedbacks;
        }

        public async Task<IEnumberable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            this._context.Feedbacks.Where(x=>x.UserId==userId);
        }

        public async Task<bool> AddFeedback(Feedback feedback)
        {
            this._context.Feedbacks.Add(feedback);            
            this._context.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var result = this._context.Feedbacks.Where(x.FeedbackId == feedbackId);
            if(result==null)
            {
                return false;
            }

            this._context.Feedbacks.Remove(x=>x.FeedbackId==feedbackId);
            this._context.SaveChanges();
            return true;
        }
    }
}