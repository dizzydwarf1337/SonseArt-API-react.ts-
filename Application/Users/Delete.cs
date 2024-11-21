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
    public class Delete
    {
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Guid id { get; set; }
        }
        public class Handler : IRequestHandler<Command,ApiResponse<Unit>>
        {
            private readonly IUserRepository _userRepo;
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await _userRepo.DeleteUser(request.id);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex)
                {
                    return ApiResponse<Unit>.Failure($"Error while deleting an user: {ex.Message}");
                }
            }
        }
    }
}
