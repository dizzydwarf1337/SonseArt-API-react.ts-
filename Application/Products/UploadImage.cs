using Application.Dtos;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class UploadImage
    {
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Guid Id { get; set; }
            public IFormFile? ImageFile { get; set; }
        }
        public class Handler : IRequestHandler<Command,ApiResponse<Unit>>
        {
            private readonly IProductRepository _productRepo;
            public Handler(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await _productRepo.UploadImage(request.Id, request.ImageFile);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex) 
                {
                    return ApiResponse<Unit>.Failure($"Error while uploading an image: {ex.Message}");
                }
            }
        }
    }
}
