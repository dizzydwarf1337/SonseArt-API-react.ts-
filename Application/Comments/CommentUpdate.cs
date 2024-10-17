using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class CommentUpdate
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public CommentDto Comment { get; set; }
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
                var comment = new Comment
                {
                    Id = request.Comment.Id,
                    Text = request.Comment.Text,
                    CreatedAt = request.Comment.CreatedAt,
                    ProductId = request.Comment.ProductId,
                    Updated = request.Comment.Updated,
                };
                await _commentRepository.UpdateComment(request.Id, comment);
            }
        }
    }
}
