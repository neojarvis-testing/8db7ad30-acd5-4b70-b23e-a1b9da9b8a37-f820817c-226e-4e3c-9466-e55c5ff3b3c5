using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp4.Data
{
    public class FeedbackDbContext : DbContext
    {
        public FeedbackDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
