using CommonLibrary.Models;
using dotnetapp1.Data;
using dotnetapp2.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp2.Services
{
    public class BookingService // add interface
    {
        private readonly ApplicationDbContext _context;
        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await _context.Bookings.ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserId(int userId)
        {
            return await _context.Bookings.Where(x=>x.UserId==userId).ToListAsync();
        } 

        public async Task<bool> AddBooking(Booking booking)
        {
            var conferenceEvent = _context.ConferenceEvents.FirstOrDefault(x=>x.ConferenceEventId==booking.ConferenceEventId);
            if(conferenceEvent==null)
            {
                throw new ConferenceEventException("Conference Event not found");
            }
            else if(conferenceEvent.Capacity<=0)
            {
                throw new ConferenceEventException("No more seats available for this event");
            }
            var bookingExists = _context.Bookings.Any(x => x.ConferenceEventId == booking.ConferenceEventId && x.UserId == booking.UserId);
            if(bookingExists)
            {
                throw new ConferenceEventException("No more seats available for this event");
            }

            _context.Bookings.Add(booking);

            conferenceEvent.Capacity = conferenceEvent.Capacity -1;
            _context.ConferenceEvents.Update(conferenceEvent);
            _context.SaveChanges();
            return true;
        }

        public async Task<bool> UpdateBooking(int bookingId, Booking booking)
        {
            var existingBooking = _context.Bookings.FirstOrDefault(x=> x.BookingId == bookingId);
            if(existingBooking==null)
            {
                return false;
            }
            // Add logic to update the fields as required in existingBooking from booking
            _context.Bookings.Update(existingBooking);
            _context.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteBooking(int bookingId)
        {
            var result = _context.Bookings.FirstOrDefault(x=> x.BookingId == bookingId);
            if(result==null)
            {
                return false;
            }

            _context.Bookings.Remove(result);
            _context.SaveChanges();
            return true;
        }
    }
}