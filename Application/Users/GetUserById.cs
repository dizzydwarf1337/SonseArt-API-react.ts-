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
    public class GetUserById
    {
        public class Query : IRequest<ApiResponse<UserDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, ApiResponse<UserDto>>
        {
            private readonly IUserRepository _userRepo;
            public async Task<ApiResponse<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var data = await _userRepo.GetUser(request.Id);
                    return ApiResponse<UserDto>.Success(data);
                }
                catch (Exception ex) 
                {
                    return ApiResponse<UserDto>.Failure($"Error while getting user by id: {ex.Message}");
                }
            }
        }
    }
}
