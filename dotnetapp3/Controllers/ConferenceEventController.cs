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

namespace dotnetapp3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConferenceEventController : ControllerBase
    {
        //ApplicationDbContext
        private readonly ApplicationDbContext _context;
        public ConferenceEventController(ApplicationDbContext context)
        {
            _context=context;
        }
        //GET: api/ConferenceEvents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConferenceEvent>>> GetConferenceEvent()
        {
            return await _context.ConferenceEvent.ToListAsync(); 
        }

        //GET:api/ConferenceEvents/7
        [HttpGet("{id}")]
        public async Task<ActionResult<ConferenceEvent>> GetConferenceEvent(int id)
        {
            var conferanceevent  = await _context.ConferenceEvents.FindAsync(id);
            if(conferanceevent==null)
            {
                return NotFound();
            }
            return conferanceevent;

        }
        //PUT: api/ConferenceEvents/7
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConferenceEvent(int id,ConferenceEvent conferenceevent)
        {
            if(id!=conferenceevent.Id)
            {
                return BadRequest();
            }
            _context.Entry(conferenceevent).State=EntityState.Modified;
            try
            {
              await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!ConferenceEventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();

        }
        
    
    //POST: api/ConferenceEvents
    [HttpPost]
    public async Task<ActionResult<ConferenceEvent>> PostConferenceEvent(ConferenceEvent conferenceevent)
    {
        _context.ConferenceEvents.Add(conferenceevent);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetConferenceEvent",new{id=conferenceevent.Id},conferenceevent);

    }
    //DELETE: api/ConferenceEvents/7
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteConferenceEvent(int id)
    {
        var conferenceevent=await _context.ConferenceEvents.FindAsync(id);
        if(conferenceevent==null)
        {
            return NotFound();
        }
        _context.ConferenceEvents.Remove(conferenceevent);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    private bool ConferenceEventExists(int id)
    {
        return _context.ConferenceEvents.Any(e=>e.Id==id);
    }
 }

}