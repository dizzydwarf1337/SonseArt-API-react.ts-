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
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Guid Id { get; set; }
            public CommentDto Comment { get; set; }
        }
        public class Handler : IRequestHandler<Command,ApiResponse<Unit>>
        {
            private readonly ICommentRepository _commentRepository;
            public Handler(ICommentRepository commentRepository)
            {
                _commentRepository = commentRepository;
            }
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
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

                    return ApiResponse<Unit>.Success(Unit.Value); 
                }
                catch (Exception ex)
                {
                    return ApiResponse<Unit>.Failure($"Error while updating comment: {ex.Message}");
                }
            }
        }
    }
}
