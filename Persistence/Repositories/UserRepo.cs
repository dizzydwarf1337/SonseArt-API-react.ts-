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

        public UserRepo(UserManager<User> userManager, ApplicationContext context)
        {
            _userManager = userManager;
            _context = context;

        }
        public async Task CreateUser(UserDto user, string password)
        {
            var User = new User
            {
                City = user.City,
                Street = user.Street,
                ZipCode = user.ZipCode,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                NormalizedEmail = user.Email.ToUpper(),
                NormalizedUserName = user.Email.ToUpper(),
                UserName = user.Email
            };
            await _userManager.CreateAsync(User, password);
            await _context.Users.AddAsync(User);

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

        public async Task<UserDto> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            return new UserDto(user);
        }

        public async Task<UserDto> GetUser(string email)
        {
           var user= (await _context.Users.FirstOrDefaultAsync(x => x.Email == email));
           return new UserDto(user);
        }

        public async Task UpdateUser(UserDto user, Guid id)
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
