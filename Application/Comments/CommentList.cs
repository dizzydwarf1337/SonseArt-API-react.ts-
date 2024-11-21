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
        public class Query : IRequest<ApiResponse<List<CommentDto>>>
        {
            public Guid ProductId { get; set; }
        }
        public class Handler : IRequestHandler<Query, ApiResponse<List<CommentDto>>>
        {
            private readonly ICommentRepository _commentRepository;
            public Handler(ICommentRepository commentRepository)
            {
                _commentRepository = commentRepository;
            }
            public async Task<ApiResponse<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var comments = await _commentRepository.GetComments(request.ProductId);

                    if (comments == null || !comments.Any())
                        return ApiResponse<List<CommentDto>>.Failure("No comments found for the specified product.");

                    var commentsDtos = comments.Select(c => new CommentDto
                    {
                        Id = c.Id,
                        Text = c.Text,
                        CreatedAt = c.CreatedAt,
                        ProductId = c.ProductId,
                        Updated = c.Updated,
                    }).ToList();

                    return ApiResponse<List<CommentDto>>.Success(commentsDtos);
                }
                catch (Exception ex)
                {
                    return ApiResponse<List<CommentDto>>.Failure($"Error retrieving comments: {ex.Message}");
                }
            }

        }
    }
}
