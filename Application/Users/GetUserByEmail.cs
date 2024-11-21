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
        public class Query : IRequest<ApiResponse<UserDto>>
        {
            public EmailRequest email { get; set; }
        }
        public class Handler : IRequestHandler<Query, ApiResponse<UserDto>>
        {
            private readonly IUserRepository _userRepository;
            public Handler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }
            public async Task<ApiResponse<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var data = await _userRepository.GetUserByEmail(request.email.Email);
                    return ApiResponse<UserDto>.Success(data);
                }
                catch (Exception ex)
                {
                    return ApiResponse<UserDto>.Failure($"Error while getting user by email: {ex.Message}");
                }
            }
        }
    }
}
