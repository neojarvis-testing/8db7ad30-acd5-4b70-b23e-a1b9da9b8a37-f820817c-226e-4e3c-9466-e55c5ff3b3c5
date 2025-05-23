using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp1.Services
{
    public interface IAuthService
    {
        Task<(int,string)> Registration (User model, string Role);
        Task<(int,string)> Login (LoginModel model);
    }
}