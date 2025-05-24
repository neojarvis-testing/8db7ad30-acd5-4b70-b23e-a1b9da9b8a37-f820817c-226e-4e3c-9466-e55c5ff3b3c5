using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetapp2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;            
        }

        [HttpGet]
        [Authorize(Role="Admin,User")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            try
            {
                return Ok(await _bookingService.GetAllBookings());
            }
            catch (Exception ex)
            {
               return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Authorize(Role="Admin,User")]
        [Route("{userId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingsByUserId(int userId)
        {
            try
            {
                var result = _bookingService.GetBookingsByUserId(userId);
                if(result!=null)
                {
                    return Ok(await _bookingService.GetBookingsByUserId(userId));
                }
                else
                {
                    return NotFound("Booking not found for this userId " + userId);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Role="Admin,User")]
        public async Task<ActionResult> AddBooking([FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.AddBooking(booking);
                if(result)
                {
                    return Ok("Booking added successfully");
                }
                else
                {
                    return StatusCode(500, "Failed to add booking");                        
                }
            }
            catch (Exception ex)
            {
               return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(Role="Admin,User")]
        public async Task<ActionResult> UpdateBooking(int bookingId, [FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.UpdateBooking(bookingId, booking);
                if(result)
                {
                    return Ok("Booking updated successfully");
                }
                else
                {
                    return NotFound("Booking not found");     
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Authorize(Role="Admin")]
        [Route("{bookingId}")]
        public async Task<ActionResult> DeleteBooking(int bookingId)
        {
            try
            {
                var result = await _bookingService.DeleteBooking(bookingId);
                if(result)
                {
                    return Ok("Booking deleted successfully");
                }
                else
                {
                    return NotFound("Booking not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }        
    }
}