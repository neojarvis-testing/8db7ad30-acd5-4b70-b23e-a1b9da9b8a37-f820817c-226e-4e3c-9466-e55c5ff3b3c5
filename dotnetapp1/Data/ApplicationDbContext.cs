using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp1.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly ILogger<ApplicationDbContext> _logger;

        public ApplicationDbContext(DbContextOptions options) :base(options)
        {
            //_logger = logger;
        }

        public DbSet<User> Users {get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ConferenceEvent> ConferenceEvents { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}