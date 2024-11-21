using Application.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Auth
{
    public class Logout
    {
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public EmailRequest email { get; set; }
        }
        public class Handler : IRequestHandler<Command, ApiResponse<Unit>>
        {
            private readonly AuthService _authService;
            public Handler(AuthService authService)
            {
                _authService = authService;
            }
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await _authService.Logout(request.email);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex)
                {
                    return ApiResponse<Unit>.Failure($"Error while logging out: {ex.Message}");
                }
            }
        }
    }

}