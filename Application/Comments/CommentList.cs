using Application.Dtos;
using Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class CommentList
    {
        public class Query : IRequest<List<CommentDto>>
        {
            public Guid ProductId { get; set; }
        }
        public class Handler : IRequestHandler<Query, List<CommentDto>>
        {
            private readonly ICommentRepository _commentRepository;
            public Handler (ICommentRepository commentRepository)
            {
                _commentRepository = commentRepository;
            }
            public async Task<List<CommentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _commentRepository.GetComments(request.ProductId);
                return comments.Select(c => new CommentDto
                {
                    Id = c.Id,
                    Text =c.Text,
                    CreatedAt = c.CreatedAt,
                    ProductId = c.ProductId,
                    Updated = c.Updated,
                }).ToList();
            }
        }

    }
}
