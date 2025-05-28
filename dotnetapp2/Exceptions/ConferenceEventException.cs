using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp2.Exceptions
{
    public class ConferenceEventException :Exception
    {
        private readonly string message;
        public ConferenceEventException(string message):base(message)
        {
            this.message = message;
        }
    }
}