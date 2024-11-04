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
        public class Query : IRequest<User>
        {
            public UserDto User { get; set; }
        }
        public class Hanlder : IRequestHandler<Query,User>
        {
            private readonly IUserRepository _userRepository;
            private readonly UserManager<User> _userManager;
            private readonly AuthService _auth;   
            public Hanlder(IUserRepository userRepository, UserManager<User> userManager,AuthService auth)
            {
                _userRepository = userRepository;
                _userManager = userManager;
                _auth = auth;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _userRepository.CreateUser(request.User);
            }
        }
    }
}
