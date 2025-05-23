using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetapp3.Exceptions
{
    public class ConferenceEventException : Exception
    {
        private readonly string message;

        public ConferenceEventException(string message)
        {
            this.message = message;
        }

    }
}