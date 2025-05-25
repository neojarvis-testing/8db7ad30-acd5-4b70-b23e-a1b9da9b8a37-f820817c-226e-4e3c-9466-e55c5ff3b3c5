using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonLibrary.Models;
namespace dotnetapp3.Services
{
    public interface IConferenceEventService
    {
        Task<bool> AddConferenceEvent(ConferenceEvent conferenceevent);
        Task<bool> DeleteConferenceEvent(int conferenceeventid);
        Task<IEnumerable<ConferenceEvent>> GetAllConferenceEvents();
        Task<IEnumerable<ConferenceEvent>> GetConferenceEventById(int id);
        
    }
}