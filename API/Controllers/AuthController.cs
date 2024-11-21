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
        public async Task<IActionResult> Login(LoginDto login)
        {
            return HandleRequest(await Mediator.Send(new Login.Command { LoginDto = login }));
        }
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout(EmailRequest email)
        {
            return HandleRequest(await Mediator.Send(new Logout.Command { email = email }));
        }
    }
}
