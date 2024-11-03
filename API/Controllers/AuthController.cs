using Application.Auth;
using Application.Dtos;
using Application.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginDto>> Login(LoginDto login)
        {
            return await Mediator.Send(new Login.Command { LoginDto = login });
        }
        [Authorize]
        [HttpPost("logout")]
        public async Task Logout(EmailRequest email)
        {
            await Mediator.Send(new Logout.Command { email = email });
        }
    }
}
