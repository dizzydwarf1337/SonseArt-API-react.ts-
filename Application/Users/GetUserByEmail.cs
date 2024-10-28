using MediatR;
using Persistence.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    public class GetUserByEmail
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
        }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IUserRepository _userRepo;
            public Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                return _userRepo.GetUser(request.Email);
            }
        }
    }
}
