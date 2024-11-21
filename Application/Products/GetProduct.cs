using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class GetProduct
    {
        public class Query : IRequest<ApiResponse<Product>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, ApiResponse<Product>>
        {
            private readonly IProductRepository _productRepo;
            public Handler(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task<ApiResponse<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var data =  await _productRepo.GetProduct(request.Id);
                    return ApiResponse<Product>.Success(data);
                }
                catch (Exception ex)
                {
                    return ApiResponse<Product>.Failure($"Error while getting product: {ex.Message}");
                }
            }
        }
    }
}
