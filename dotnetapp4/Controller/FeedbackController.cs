using CommonLibrary.Models;
using dotnetapp4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp4.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _service;

        public FeedbackController(IFeedbackService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _service.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, Message = ex.Message });
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetFeedbacksByUserId(int userId)
        {
            try
            {
                var feedbacks = await _service.GetFeedbacksByUserId(userId);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, Message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                var result = await _service.AddFeedback(feedback);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,new { Success = false, Message = ex.Message });
            }
        }

        [HttpDelete("{feedbackId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                var result = await _service.DeleteFeedback(feedbackId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,new { Success = false, Message = ex.Message });
            }
        }
    }
}