using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Persistence.Database;
using Persistence.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class UserRepo : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationContext _context;
        private readonly IUserStore<User> _userStore;
        private readonly IUserEmailStore<User> _emailStore;

        public UserRepo(UserManager<User> userManager, ApplicationContext context, IUserStore<User> userStore, IUserEmailStore<User> emailStore)
        {
            _userManager = userManager;
            _context = context;
            _userStore = userStore;
            _emailStore = emailStore;

        }
        public async Task CreateUser(User user, string password)
        {
            await _userStore.SetUserNameAsync(user, user.Email, CancellationToken.None);
            await _userStore.SetNormalizedUserNameAsync(user, user.Email, CancellationToken.None);
            await _emailStore.SetEmailAsync(user, user.Email, CancellationToken.None);
            await _emailStore.SetNormalizedEmailAsync(user, user.Email, CancellationToken.None);
            await _emailStore.SetEmailConfirmedAsync(user, false, CancellationToken.None);
            await _userManager.CreateAsync(user, password);
            await _context.Users.AddAsync(user);

        }

        public async Task DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<User> GetUser(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUser(string email)
        {
            return (await _context.Users.FirstOrDefaultAsync(x => x.Email == email));
        }

        public async Task UpdateUser(User user, Guid id)
        {
            var User = await _context.Users.FindAsync(id);
            User.Street = user.Street;
            User.City = user.City;
            User.ZipCode = user.ZipCode;
            User.FirstName = user.FirstName;
            User.LastName = user.LastName;
            User.Email = user.Email;
            User.NormalizedEmail = user.Email.ToUpper();
            User.NormalizedUserName = user.Email.ToUpper();
            User.UserName = user.Email;

            _context.Update(User);
            await _context.SaveChangesAsync();
        }
        public async Task ChangePassword(Guid id, string newPassword)
        {
            var user = await _context.Users.FindAsync(id);
            if (user!=null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                await _userManager.ResetPasswordAsync(user, token, newPassword);
            }
            
        }
    }
}
