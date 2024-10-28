using MediatR;
using Persistence.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserRepository _userRepo;
            public Task Handle(Command request, CancellationToken cancellationToken)
            {
                return _userRepo.DeleteUser(request.id);
            }
        }
    }
}
