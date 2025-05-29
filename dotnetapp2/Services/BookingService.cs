using CommonLibrary.Models;
using dotnetapp1.Data;
using dotnetapp2.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp2.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;
        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await _context.Bookings
                .Include(x => x.ConferenceEvent)
                .Include(x => x.User)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserId(int userId)
        {
            return await _context.Bookings.Where(x => x.UserId == userId).Include(x => x.ConferenceEvent)
                .Include(x => x.User).ToListAsync();
        }

        // public async Task<<Booking> GetBookingsById(int bookingId)
        // {
        //     return await _context.Bookings.Where(x => x.BookingId == bookingId);
        // }

        public async Task<bool> AddBooking(Booking booking)
        {
            var conferenceEvent = await _context.ConferenceEvents
                .FirstOrDefaultAsync(x => x.ConferenceEventId == booking.ConferenceEventId);

            if (conferenceEvent == null)
                throw new ConferenceEventException("Conference Event not found");

            if (conferenceEvent.Capacity <= 0)
                throw new ConferenceEventException("No more seats available for this event");

            var bookingExists = await _context.Bookings
                .AnyAsync(x => x.ConferenceEventId == booking.ConferenceEventId && x.UserId == booking.UserId);

            if (bookingExists)
                throw new ConferenceEventException("You have already booked this event");

            _context.Bookings.Add(booking);

            conferenceEvent.Capacity -= 1;
            _context.ConferenceEvents.Update(conferenceEvent);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateBooking(int bookingId, Booking booking)
        {
            var existingBooking = await _context.Bookings.FirstOrDefaultAsync(x => x.BookingId == bookingId);
            if (existingBooking == null)
                return false;

            // Update fields as required
            existingBooking.BookingStatus = booking.BookingStatus;
            existingBooking.BookingDate = booking.BookingDate;
            existingBooking.Gender = booking.Gender;
            existingBooking.Age = booking.Age;
            existingBooking.Occupation = booking.Occupation;
            existingBooking.City = booking.City;
            existingBooking.Proof = booking.Proof;
            existingBooking.AdditionalNotes = booking.AdditionalNotes;

            _context.Bookings.Update(existingBooking);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBooking(int bookingId)
        {
            var result = await _context.Bookings.FirstOrDefaultAsync(x => x.BookingId == bookingId);
            if (result == null)
                return false;

            var conferenceEvent = await _context.ConferenceEvents
                .FirstOrDefaultAsync(x => x.ConferenceEventId == result.ConferenceEventId);
            _context.Bookings.Remove(result);

            if(conferenceEvent!=null)
            {
            conferenceEvent.Capacity += 1;
            _context.ConferenceEvents.Update(conferenceEvent);
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}