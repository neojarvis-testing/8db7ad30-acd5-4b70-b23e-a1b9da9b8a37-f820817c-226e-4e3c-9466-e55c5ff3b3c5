using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonLibrary.Models;
namespace dotnetapp3.Services
{
    public interface IConferenceEventService
    {
        Task<IEnumerable<ConferenceEvent>> GetAllConferenceEvents();
        Task<ConferenceEvent> GetConferenceEventById(int conferenceEventId);
        Task<bool> AddConferenceEvent(ConferenceEvent conferenceEvent);
        Task<bool> UpdateConferenceEvent(int conferenceEventId, ConferenceEvent conferenceEvent);
        Task<bool> DeleteConferenceEvent(int conferenceEventId);
    }
}