using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Identity
{
    public interface IUserRepository
    {
        public Task<UserDto> GetUser(Guid id);
        public Task<UserDto> GetUser(string email);
        public Task CreateUser(UserDto user, string password);
        public Task UpdateUser(UserDto user, Guid id);
        public Task DeleteUser(Guid id);
        public Task ChangePassword (Guid id,  string newPassword);

    }
}
