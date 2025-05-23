using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp1.Data
{
    public class AuthDbContext : DbContext
    {
        private readonly ILogger<AuthDbContext> _logger;

        public AuthDbContext(ILogger<AuthDbContext> logger)
        {
            _logger = logger;
        }

        public DbSet<User> Users {get; set;}
    }
}