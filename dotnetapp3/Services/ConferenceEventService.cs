using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonLibrary.Models;
using dotnetapp1.Data;
using dotnetapp3.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp3.Services
{
    public class ConferenceEventService // add an interface
    {
        private readonly ApplicationDbContext _context;
        public ConferenceEventService(ApplicationDbContext context)
        {
            _context = context;
            
        }

        public async Task<IEnumerable<ConferenceEvent>> GetAllConferenceEvents()
        {
            return await _context.ConferenceEvents.ToListAsync();
        }

        public async Task<ConferenceEvent> GetConferenceEventById(int conferenceEventId)
        {
            return await _context.ConferenceEvents.FirstOrDefaultAsync(x => x.ConferenceEventId == conferenceEventId);
        }

        public async Task<bool> AddConferenceEvent(ConferenceEvent conferenceEvent)
        {
            var existingConferenceEvent = await _context.ConferenceEvents.FirstOrDefaultAsync(x=>x.EventName == conferenceEvent.EventName);
            if(existingConferenceEvent != null)
            {
                throw new ConferenceEventException("Event with the same name already exists");
            }
            else
            {
                _context.ConferenceEvents.Add(conferenceEvent);
                _context.SaveChanges();
                return true;
            }
        }

        public async Task<bool> UpdateConferenceEvent(int conferenceEventId, ConferenceEvent conferenceEvent)
        {
            var existingConference = await _context.ConferenceEvents.FirstOrDefaultAsync(x => x.ConferenceEventId == conferenceEventId);
            if(existingConference == null)
            {
                throw new ConferenceEventException("Event doesn't exists");
            }
            else
            {
                // assign required fields before updating
                _context.ConferenceEvents.Update(existingConference);
                _context.SaveChanges();
                return true;
            }
        }

        public async Task<bool> DeleteConferenceEvent(int conferenceEventId)
        {
            var existingConference = await _context.ConferenceEvents.FirstOrDefaultAsync(x => x.ConferenceEventId == conferenceEventId);
            _context.ConferenceEvents.Remove(existingConference);
            _context.SaveChanges();
            return true;
        }
    }
}