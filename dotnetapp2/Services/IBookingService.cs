using CommonLibrary.Models;

namespace dotnetapp2.Services
{
    public interface IBookingService
    {
        Task<IEnumerable<Booking>> GetAllBookings();
        Task<IEnumerable<Booking>> GetBookingsByUserId(int userId);
        Task<bool> AddBooking(Booking booking);
        Task<bool> UpdateBooking(int bookingId, Booking booking);
        Task<bool> DeleteBooking(int bookingId);
    }
}
