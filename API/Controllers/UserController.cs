using Application.Dtos;
using Application.Login;
using Application.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence.Identity;

namespace API.Controllers
{
    public class UserController : BaseAPIController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            return HandleRequest(await Mediator.Send(new GetUserById.Query { Id = id }));
        }
        [HttpPost("email")]
        public async Task<IActionResult> GetUserByEmail([FromBody]EmailRequest email)
        {
            return HandleRequest(await Mediator.Send(new GetUserByEmail.Query { email = email }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDto user)
        {
            await Mediator.Send(new Create.Query { User = user});
            return HandleRequest(await Mediator.Send(new Login.Command { LoginDto = new LoginDto { Email = user.Email, Password = user.Password } }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, UserDto user)
        {
            return HandleRequest(await Mediator.Send(new Update.Command { Id = id, User = user }));
        }
        [HttpPut("/password/{id}")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody]string newPassword)
        {
            return HandleRequest(await Mediator.Send(new ResetPassword.Command { Id = id, Password = newPassword }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            return HandleRequest(await Mediator.Send(new Delete.Command { id = id }));
        }

    }
}
