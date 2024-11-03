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
        public class Command : IRequest
        {
            public EmailRequest email { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly AuthService _authService;
            public Handler(AuthService authService)
            {
                _authService = authService;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _authService.Logout(request.email);
            }
        }
    }

}