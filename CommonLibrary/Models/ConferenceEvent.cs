using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommonLibrary.Models
{
    public class ConferenceEvent
    {
        public int ConferenceEventId { get; set; }
        public string EventName { get; set; }
        public string OrganizerName { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int Capacity { get; set; }           
    }
}