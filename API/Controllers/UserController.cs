using Application.Dtos;
using Application.Users;
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
        [HttpGet("{email}")]
        public async Task<ActionResult<UserDto>> GetUser(string email)
        {
            return await Mediator.Send(new GetUserByEmail.Query { Email = email });
        }
        [HttpPost]
        public async void CreateUser(UserDto user, string password)
        {
            await Mediator.Send(new Create.Command { User = user, Password= password});
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
