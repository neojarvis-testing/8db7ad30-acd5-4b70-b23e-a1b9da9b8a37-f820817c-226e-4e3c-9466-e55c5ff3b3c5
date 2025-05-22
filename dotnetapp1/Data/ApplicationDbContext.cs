using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetapp1.Data
{
    [Route("[controller]")]
    public class ApplicationDbContext : Controller
    {
        private readonly ILogger<ApplicationDbContext> _logger;

        public ApplicationDbContext(ILogger<ApplicationDbContext> logger)
        {
            _logger = logger;
        }

        public DbSet<User> Users {get; set;}
        public DbSet<Booking> Bookings {get; set;}
        public DbSet<ConferenceEvent> ConferenceEvents {get; set;}
        public DbSet<Feedback> Feedbacks {get; set;}


        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}