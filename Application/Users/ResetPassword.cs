using MediatR;
using Persistence.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    public class ResetPassword
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Password { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserRepository _userRepo;
            public Handler(IUserRepository userRepo)
            {
                _userRepo = userRepo;
            }
            public Task Handle(Command request, CancellationToken cancellationToken)
            {
                return _userRepo.ChangePassword(request.Id, request.Password);
            }
        }
    }
}
