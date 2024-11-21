using Application.Dtos;
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
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Guid Id { get; set; }
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
                    await _commentRepository.DeleteComment(request.Id);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex) {
                    return ApiResponse<Unit>.Failure($"Error while deleting comment: {ex.Message}");
                }
            }
        }
    }
}
