using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Identity
{
    public interface IUserRepository
    {
        public Task<User> GetUser(Guid id);
        public Task<User> GetUser(string email);
        public Task CreateUser(User user, string password);
        public Task UpdateUser(User user, Guid id);
        public Task DeleteUser(Guid id);
        public Task ChangePassword (Guid id,  string newPassword);

    }
}
