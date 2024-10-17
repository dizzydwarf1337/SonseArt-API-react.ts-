using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ICommentRepository _commentRepository;
            public Handler(ICommentRepository commentRepository)
            {
                _commentRepository = commentRepository;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _commentRepository.DeleteComment(request.Id);
            }
        }
    }
}
