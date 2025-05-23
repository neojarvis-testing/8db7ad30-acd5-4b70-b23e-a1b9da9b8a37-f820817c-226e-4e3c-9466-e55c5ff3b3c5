using CommonLibrary.Models;
using dotnetapp1.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotnetapp1.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;        
        private readonly AuthDbContext _context;

        private const string SecretKey ="abc123xyz";

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,        
                            IConfiguration configuration, AuthDbContext context)
        {
            this._context = context;
            this.configuration = configuration;
            this.roleManager = roleManager;
            this.userManager = userManager;
            
        }

        public async Task<(int,string)> Registration(User model, string role)
        {
           var result =  this._context.Users.FirstOrDefault(x=>x.Email==model.Email);

           if(result != null)
           {
            return (1,"User already Exists");
           }

            //this._context.Users.UserRole=role;
            var addUser = this._context.Users.Add(model);
            var isAdded = _context.SaveChanges();
            //check below condition
            if(isAdded == 0)
            {
                return (1,"User Created Failed! Please check user details and try again.");
            }
            else
            {
                return (1,"User Created Successfully!");
            }      
        }

        public async Task<(int,string)> Login(LoginModel model)
        {
            var result =  this._context.Users.FirstOrDefault(x=>x.Email==model.Email);

           if(result==null)
           {
            return (1,"Invalid Email");
           }

           var passwordCheck = this._context.Users.Where(x=>x.Password==model.Password);
           if(passwordCheck==null)
           {
            return (1,"Invalid password");
           }

            IEnumerable<Claim> claims = new List<Claim>
           {
             //new Claim(ClaimTypes.Id, model.UserId), //need to check
             new Claim(ClaimTypes.Name, result.Username),
             new Claim(ClaimTypes.Email, model.Email),
             new Claim(ClaimTypes.Role, result.UserRole)
           };

            //need to call Generate method
            var token = GenerateToken(claims);

          return (1,token);
           
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

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