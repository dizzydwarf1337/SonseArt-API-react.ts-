using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class ProductList
    {
        public class Query : IRequest<ApiResponse<IEnumerable<Product>>>
        {
        }
        public class Handler : IRequestHandler<Query, ApiResponse<IEnumerable<Product>>>
        {
            private readonly IProductRepository _productRepo;
            public Handler(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task<ApiResponse<IEnumerable<Product>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var data = await _productRepo.GetProducts();
                    return ApiResponse<IEnumerable<Product>>.Success(data);
                }
                catch (Exception ex) 
                {
                    return ApiResponse<IEnumerable<Product>>.Failure($"Error while getting products: {ex.Message}");
                }
            }
        }
    }
}
