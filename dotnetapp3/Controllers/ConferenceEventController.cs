using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using CommonLibrary.Models;
using dotnetapp1.Data;
using dotnetapp3.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp3.Services;
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
                return Ok(await _service.GetAllConferenceEvents());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<IActionResult> GetConferenceEventById(int userId)
        {
            try
            {
                return Ok(await _service.GetConferenceEventById(userId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddConferenceEvent(ConferenceEvent conferenceevent)
        {
            try
            {
                return Ok(await _service.AddConferenceEvent(conferenceevent));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete]
        [Route("{ConferenceEventId}")]
        public async Task<IActionResult> DeleteConferenceEvent(int conferenceeventId)
        {
            try
            {
                return Ok(await _service.DeleteConferenceEvent(conferenceeventId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        
    }

}