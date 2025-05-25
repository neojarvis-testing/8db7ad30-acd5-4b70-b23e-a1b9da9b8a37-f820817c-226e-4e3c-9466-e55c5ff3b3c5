using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonLibrary.Models;
using dotnetapp1.Data;
using dotnetapp3.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp3.Services
{
    public class ConferenceEventService : IConferenceEventService
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
            return await _context.ConferenceEvents
                .FirstOrDefaultAsync(x => x.ConferenceEventId == conferenceEventId);
        }

        public async Task<bool> AddConferenceEvent(ConferenceEvent conferenceEvent)
        {
            var existingConferenceEvent = await _context.ConferenceEvents
                .FirstOrDefaultAsync(x => x.EventName == conferenceEvent.EventName);

            if (existingConferenceEvent != null)
                throw new ConferenceEventException("Event with the same name already exists");

            _context.ConferenceEvents.Add(conferenceEvent);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateConferenceEvent(int conferenceEventId, ConferenceEvent conferenceEvent)
        {
            var existingConference = await _context.ConferenceEvents
                .FirstOrDefaultAsync(x => x.ConferenceEventId == conferenceEventId);

            if (existingConference == null)
                throw new ConferenceEventException("Event doesn't exist");

            // Update all relevant fields
            existingConference.EventName = conferenceEvent.EventName;
            existingConference.OrganizerName = conferenceEvent.OrganizerName;
            existingConference.Category = conferenceEvent.Category;
            existingConference.Description = conferenceEvent.Description;
            existingConference.Location = conferenceEvent.Location;
            existingConference.StartDateTime = conferenceEvent.StartDateTime;
            existingConference.EndDateTime = conferenceEvent.EndDateTime;
            existingConference.Capacity = conferenceEvent.Capacity;

            _context.ConferenceEvents.Update(existingConference);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteConferenceEvent(int conferenceEventId)
        {
            bool isReferenced = await _context.Bookings
                .AnyAsync(b => b.ConferenceEventId == conferenceEventId);

            if (isReferenced)
                throw new ConferenceEventException("Conference event cannot be deleted, it is referenced in bookings");

            var existingConference = await _context.ConferenceEvents.FindAsync(conferenceEventId);

            if (existingConference != null)
            {
                _context.ConferenceEvents.Remove(existingConference);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}