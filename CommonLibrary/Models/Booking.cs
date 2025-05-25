using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommonLibrary.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int ConferenceEventId { get; set; }
        public ConferenceEvent? ConferenceEvent { get; set; }
        public string BookingStatus { get; set; }
        public DateTime BookingDate { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Occupation { get; set; }
        public string City { get; set; }
        public string Proof { get; set; }
        public string? AdditionalNotes { get; set; }
    }
}