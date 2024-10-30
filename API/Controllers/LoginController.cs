using Application.Dtos;
using Application.Login;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LoginController : BaseAPIController
    {
        [HttpPost]
        public async Task<ActionResult<string>> Login(LoginDto login)
        {
            return await Mediator.Send(new Login.Command { LoginDto  = login});
        }
    }
}
