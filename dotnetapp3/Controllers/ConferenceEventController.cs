using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CommonLibrary.Models;
using dotnetapp3.Services;
using dotnetapp3.Exceptions;

namespace dotnetapp3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConferenceEventController : ControllerBase
    {
        private readonly IConferenceEventService _service;

        public ConferenceEventController(IConferenceEventService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllConferenceEvents()
        {
            try
            {
                var events = await _service.GetAllConferenceEvents();
                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{conferenceEventId}")]
        public async Task<IActionResult> GetConferenceEventById(int conferenceEventId)
        {
            try
            {
                var conferenceEvent = await _service.GetConferenceEventById(conferenceEventId);
                if (conferenceEvent == null)
                    return NotFound("Conference event not found");
                return Ok(conferenceEvent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddConferenceEvent([FromBody] ConferenceEvent conferenceEvent)
        {
            try
            {
                var result = await _service.AddConferenceEvent(conferenceEvent);
                return Ok(result);
            }
            catch (ConferenceEventException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{conferenceEventId}")]
        public async Task<IActionResult> UpdateConferenceEvent(int conferenceEventId, [FromBody] ConferenceEvent conferenceEvent)
        {
            try
            {
                var result = await _service.UpdateConferenceEvent(conferenceEventId, conferenceEvent);
                return Ok(result);
            }
            catch (ConferenceEventException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{conferenceEventId}")]
        public async Task<IActionResult> DeleteConferenceEvent(int conferenceEventId)
        {
            try
            {
                var result = await _service.DeleteConferenceEvent(conferenceEventId);
                return Ok(result);
            }
            catch (ConferenceEventException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}