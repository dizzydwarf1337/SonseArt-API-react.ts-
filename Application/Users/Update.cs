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
                var user = new User
                {
                    Id = request.Id,
                    Email = request.User.Email,
                    FirstName = request.User.FirstName,
                    LastName = request.User.LastName,
                    City = request.User.City,
                    ZipCode = request.User.ZipCode,
                    Street = request.User.Street,
                    House = request.User.House
                };
                return _userRepo.UpdateUser(user, request.Id);
            }
        }
    }
}
