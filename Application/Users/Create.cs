using Application.Dtos;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    public class Create
    {
        public class Command : IRequest
        {
            public UserDto User { get; set; }
            public string Password { get; set; }
        }
        public class Hanlder : IRequestHandler<Command>
        {
            private readonly IUserRepository _userRepository;
            private readonly UserManager<User> _userManager;
            public Hanlder(IUserRepository userRepository, UserManager<User> userManager)
            {
                _userRepository = userRepository;
                _userManager = userManager;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _userRepository.CreateUser(request.User, request.User.Password);
            }
        }
    }
}
