using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp2.Exceptions
{
    public class ConferenceEventException :Exceptions
    {
        private readonly string message;
        public ConferenceEventException(string message)
        {
            this.message = message;
        }
    }
}