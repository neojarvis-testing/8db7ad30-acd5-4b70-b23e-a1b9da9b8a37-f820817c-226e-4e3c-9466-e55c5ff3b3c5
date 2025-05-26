using CommonLibrary.Models;
using dotnetapp1.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotnetapp1.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext _context;

        private const string SecretKey = "this_is_a_top_secret_key_for_accessing_our_application_service";

        public AuthService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context)
        {
            _context = context;
            this.configuration = configuration;
            this.roleManager = roleManager;
            this.userManager = userManager;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var existingUser = _context.Users.FirstOrDefault(x => x.Email == model.Email);
            if (existingUser != null)
            {
                return (1, "User already Exists");
            }

            // Assign role if needed
            model.UserRole = role;

            _context.Users.Add(model);
            var isAdded = await _context.SaveChangesAsync();
            if (isAdded == 0)
            {
                return (1, "User Creation Failed! Please check user details and try again.");
            }
            else
            {
                return (0, "User Created Successfully!");
            }
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == model.Email);
            if (user == null)
            {
                return (1, "Invalid Email");
            }

            if (user.Password != model.Password)
            {
                return (1, "Invalid password");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole),
                new Claim("UserId", user.UserId.ToString()) 
            };

            var token = GenerateToken(claims);

            return (0, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }
    }
}