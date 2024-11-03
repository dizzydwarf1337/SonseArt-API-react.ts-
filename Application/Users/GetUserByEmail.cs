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
    public class GetUserByEmail
    {
        public class Query : IRequest<UserDto>
        {
            public EmailRequest email { get; set; }
        }
        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly IUserRepository _userRepository;
            public Handler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }
            public Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return _userRepository.GetUserByEmail(request.email.Email);
            }
        }
    }
}
