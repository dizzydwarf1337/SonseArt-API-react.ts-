using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class Create
    {
        
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Product product;
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
                    await _productRepo.CreateProduct(request.product);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex)
                {
                    return ApiResponse<Unit>.Failure($"Error while creating product: {ex.Message}");
                }
            }
        }
    }
}
