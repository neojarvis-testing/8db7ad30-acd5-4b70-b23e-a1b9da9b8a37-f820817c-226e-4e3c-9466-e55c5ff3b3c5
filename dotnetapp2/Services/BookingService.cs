using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp2.Services
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingService : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BookingService(ApplicationDbContext context)
        {
            this._context = context;
            
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return this._context.Bookings;
        }

        public async Task<IEnumberable<Booking>> GetBookingsByUserId(int userId)
        {
            this._context.Bookings.Where(x=>x.UserId==userId);
        }

        public async Task<bool> AddBooking(Booking booking)
        {
            var result = this._context.ConferenceEvents.FirstOrDefault(x=>x.ConferenceEventId==booking.ConferenceEventId);
            if(result==null)
            {
                Throw new ConferenceEventException("Conference Event not found");
            }
            else if(result.Capacity<=0)
            {
                Throw new ConferenceEventException("No more seats available for this event");
            }
            var bookingExists = this._context.Bookings.Where(x=>x.ConferenceEventId==booking.ConferenceEventId && x.UserId == booking.UserId)
            if(bookingExists)
            {
                Throw new ConferenceEventException("No more seats available for this event");
            }

            this._context.Bookings.Add(booking);
            this._context.ConferenceEvents.Capacity = this._context.ConferenceEvents.Capacity -1;
            this._context.ConferenceEvents.Update(this._context.ConferenceEvents);
            this._context.SaveChanges();
            return true;
        }

        public async Task<bool> UpdateBooking(int bookingId, Booking booking)
        {
            var result = this._context.Bookings.Where(x.BookingId == bookingId);
            if(result==null)
            {
                return false;
            }

            this._context.Bookings.Update(booking);
            this._context.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteBooking(int bookingId)
        {
            var result = this._context.Bookings.Where(x.BookingId == bookingId);
            if(result==null)
            {
                return false;
            }

            this._context.Bookings.Remove(booking);
            this._context.SaveChanges();
            return true;
        }
    }
}