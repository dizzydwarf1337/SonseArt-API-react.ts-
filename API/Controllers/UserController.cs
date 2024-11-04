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
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            return await Mediator.Send(new GetUserById.Query { Id = id });
        }
        [HttpPost("email")]
        public async Task<UserDto> GetUserByEmail([FromBody]EmailRequest email)
        {
            return await Mediator.Send(new GetUserByEmail.Query { email = email });
        }
        [HttpPost]
        public async Task<LoginDto> CreateUser(UserDto user)
        {
            await Mediator.Send(new Create.Query { User = user});
            return await Mediator.Send(new Login.Command { LoginDto = new LoginDto { Email = user.Email, Password = user.Password } });
        }
        [HttpPut("{id}")]
        public async void UpdateUser(Guid id, UserDto user)
        {
            await Mediator.Send(new Update.Command { Id = id, User = user });
        }
        [HttpPut("/password/{id}")]
        public async void ChangePassword(Guid id, [FromBody]string newPassword)
        {
            await Mediator.Send(new ResetPassword.Command { Id = id, Password = newPassword });
        }
        [HttpDelete("{id}")]
        public async void DeleteUser(Guid id)
        {
            await Mediator.Send(new Delete.Command { id = id });
        }

    }
}
