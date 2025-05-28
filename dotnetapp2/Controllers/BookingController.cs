using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using dotnetapp2.Services;
using CommonLibrary.Models;

namespace dotnetapp2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> GetAllBookings()
        {
            try
            {
                return Ok(await _bookingService.GetAllBookings());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{userId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> GetBookingsByUserId(int userId)
        {
            try
            {
                var result = await _bookingService.GetBookingsByUserId(userId);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound("Booking not found for this userId " + userId);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // [HttpGet("{bookingId}")]
        // [Authorize(Roles = "Admin,User")]
        // public async Task<ActionResult<Booking>> GetBookingsByBookingId(int bookingId)
        // {
        //     try
        //     {
        //         var result = _bookingService.GetBookingsById(bookingId);
        //         if (result != null)
        //         {
        //             return Ok(result);
        //         }
        //         else
        //         {
        //             return NotFound("Booking not found for this bookingId " + bookingId);
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //     }
        // }

        [HttpPost]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> AddBooking([FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.AddBooking(booking);
                if (result)
                {
                    return Ok("Booking added successfully");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add booking");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{bookingId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> UpdateBooking(int bookingId, [FromBody] Booking booking)
        {
            try
            {
                var result = await _bookingService.UpdateBooking(bookingId, booking);
                if (result)
                {
                    return Ok(new {message="Booking updated successfully"});
                }
                else
                {
                    return NotFound("Booking not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{bookingId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteBooking(int bookingId)
        {
            try
            {
                var result = await _bookingService.DeleteBooking(bookingId);
                if (result)
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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}