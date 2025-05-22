using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp2.Exceptions
{
    public class ConferenceEventException :Exceptions
    {
        private readonly ILogger<ConferenceEventException> _logger;
        private readonly string message;
        public ConferenceEventException(ILogger<ConferenceEventException> logger, string message)
        {
            this.message = message;
            _logger = logger;
        }
    }
}