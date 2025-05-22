using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp3.Services
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConferenceEventService : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ConferenceEventService(ApplicationDbContext context)
        {
            this._context = context;
            
        }

        public async Task<IEnumerable<ConferenceEvent>> GetAllConferenceEvents()
        {
            return this._context.ConferenceEvents;
        }

        public async Task<ConferenceEvent> GetConferenceEventById(int conferenceEventId)
        {
            return this._context.ConferenceEvents.FirstOrDefault(x=>x.ConferenceEventId==conferenceEventId);
        }

        public async Task<bool> AddConferenceEvent(ConferenceEvent conferenceEvent)
        {
            var result = this._context.ConferenceEvents.Where(x=>x.EventName == conferenceEvent.EventName);
            if(result)
            {
                Throw new ConferenceEventException("Event with the same name already exists");
            }
            else
            {
                this._context.ConferenceEvents.Add(conferenceEvent);
                this._context.SaveChanges();
                return true;
            }
        }

        public async Task<bool> UpdateConferenceEvent(int conferenceEventId, ConferenceEvent conferenceEvent)
        {
            
            if(this._context.ConferenceEvents.Where(x=>x.ConferenceEventId == conferenceEventId)==null)
            {
                return false;
            }
            var result = this._context.ConferenceEvents.Where(x=>x.EventName == conferenceEvent.EventName);
            if(result)
            {
                Throw new ConferenceEventException("Event with the same name already exists");
            }
            else
            {
                this._context.ConferenceEvents.Update(conferenceEvent);
                this._context.SaveChanges();
                return true;
            }
        }

        public async Task<bool> DeleteConferenceEvent(int conferenceEventId)
        {

        }
    }
}