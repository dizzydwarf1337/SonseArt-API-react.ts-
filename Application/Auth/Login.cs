using Application.Dtos;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Persistence.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Login
{
    public class Login
    {
       public class Command : IRequest<LoginDto>
        {
            public LoginDto LoginDto { get; set; }
        }
        public class Handler : IRequestHandler<Command,LoginDto>
        {
            private readonly AuthService _authService;

            public Handler(AuthService authService)
            {
                _authService = authService;
            }

            public async Task<LoginDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var token = await _authService.Authenticate(request.LoginDto);
                if (token == null)
                {
                    return null;
                }
                return new LoginDto { Email=request.LoginDto.Email, Token = token };
            }
        }
    }
}
