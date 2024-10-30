using Application.Dtos;
using MediatR;
using Persistence.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    public class Update
    {
        public class Command : IRequest
        {
            public UserDto User { get; set; }
            public Guid Id { get; set; }
        }
        public class Hanlder : IRequestHandler<Command>
        {
            private readonly IUserRepository _userRepo;
            public Task Handle(Command request, CancellationToken cancellationToken)
            {
                return _userRepo.UpdateUser(request.User, request.Id);
            }
        }
    }
}
