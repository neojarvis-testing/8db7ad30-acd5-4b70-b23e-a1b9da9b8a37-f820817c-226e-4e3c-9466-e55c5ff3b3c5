using CommonLibrary.Models;

namespace dotnetapp1.Services
{
    public interface IAuthService
    {
        Task<(int,string)> Registration (User model, string Role);
        Task<(int,string)> Login (LoginModel model);
    }
}