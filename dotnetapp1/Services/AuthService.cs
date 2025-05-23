using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp1.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;        
        private readonly ApplicationDbContext _context;

        private const string SecretKey ="abc123xyz";

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,        
                            IConfiguration configuration, ApplicationDbContext context)
        {
            this._context = context;
            this.configuration = configuration;
            this.roleManager = roleManager;
            this.userManager = userManager;
            
        }

        public async Task<(int,string)> Registration(User model, string role)
        {
           var result =  this._context.Users.Where(x=>x.Email==model.Email);

           if(result)
           {
            return (1,"User already Exists");
           }

            //this._context.Users.UserRole=role;
            var addUser = this._context.Users.Add(model);

            //check below condition
            if(addUser.Contains("error"))
            {
                return (1,"User Created Failed! Please check user details and try again.");
            }
            else
            {
                return (1,"User Created Successfully!");
            }      
        }

        public Task<(int,string)> Login(LoginModel model)
        {
            var result =  this._context.Users.Where(x=>x.Email==model.Email);

           if(result==null)
           {
            return (1,"Invalid Email");
           }

           var passwordCheck = this._context.Users.Where(x=>x.Password==model.Password);
           if(passwordCheck==null)
           {
            return (1,"Invalid password");
           }
           
           IEnumberable<Claim> claims = new List<Claim>
           {
             new Claim(ClaimType.Id, model.UserId), //need to check
             new Claim(ClaimType.Name, model.Username),
             new Claim(ClaimType.Email, model.Email),
             new Claim(ClaimType.Role, model.UserRole)
           }          

           //need to call Generate method
          var token = GenerateToken(claims)

          return (1,token);
           
        }

        private string Generate(IEnumberable<Claim> claims)
        {
            var key =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1);
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            var tokenHandler.WriteToken(securityToken);
        }
    }
}