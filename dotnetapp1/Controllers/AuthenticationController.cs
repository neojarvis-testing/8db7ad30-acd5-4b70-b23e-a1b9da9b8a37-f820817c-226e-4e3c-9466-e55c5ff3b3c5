using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CommonLibrary.Models;
using dotnetapp1.Services;


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
                return BadRequest("Invalid login request");
            }

            try
            {
                var token=await _authService.Login(model);
                return Ok(new{Token=token});
            }
            catch (Exception ex)
            {
                return StatusCode(500,$"Internal server error:{ex.Message}");
    
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult>Register([FromBody]User model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid registration request");
            
            }
            try
            {
                var result=await _authService.Registration(model,model.UserRole);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return StatusCode(500,$"Internal server error:{ex.Message}");
            }
        }
    }
}