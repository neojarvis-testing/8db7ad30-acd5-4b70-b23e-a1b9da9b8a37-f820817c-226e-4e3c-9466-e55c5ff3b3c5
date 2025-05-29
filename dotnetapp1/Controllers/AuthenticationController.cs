using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CommonLibrary.Models;
using dotnetapp1.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace dotnetapp1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        
        public AuthenticationController(IAuthService authService)
        {
            _authService=authService;
        }
        [HttpPost("login")]
        
        public async Task<IActionResult>Login([FromBody]LoginModel model )
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new {Success=false,Message="Invalid login request"});
            }

            try
            {
                var result=await _authService.Login(model);
                if (result.Item1 != 0)
                    return Unauthorized(result.Item2);

                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(result.Item2);

                var role = jwtToken.Claims.FirstOrDefault(c => c.Type == "role")?.Value;
                var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
                var userName = jwtToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value;

                return Ok(new {Success=true, Token = result.Item2, role, userId,userName });
            }
            catch (Exception ex)
            {
                return StatusCode(500,new {Success=false,Message=$"Internal server error: {ex.Message}"});
    
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult>Register([FromBody]User model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new {Success=false,Message="Invalid registration request"});
            
            }
            try
            {
                var result=await _authService.Registration(model,model.UserRole);
                return Ok(new {Success= true,result});
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { Success = false, Message = $"Internal server error: {ex.Message}" });
            }
        }
    }
}