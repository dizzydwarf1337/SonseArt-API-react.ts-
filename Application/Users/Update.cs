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
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public UserDto User { get; set; }
            public Guid Id { get; set; }
        }
        public class Hanlder : IRequestHandler<Command, ApiResponse<Unit>>
        {
            private readonly IUserRepository _userRepo;
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await _userRepo.UpdateUser(request.User, request.Id);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex)
                {
                    return ApiResponse<Unit>.Failure($"Error while updating user: {ex.Message}");
                }
            }
        }
    }
}
