using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts
{
    public class GetProducts
    {
        public class Query : IRequest<ApiResponse<List<Product>>>
        {
            public Guid cartId { get; set; }
        }
        public class Handler : IRequestHandler<Query, ApiResponse<List<Product>>>
        {
            private ICartRepository _cartRepository;
            public Handler(ICartRepository cartRepository)
            {
                _cartRepository = cartRepository;
            }
            public async Task<ApiResponse<List<Product>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var result = await _cartRepository.GetProducts(request.cartId);
                    return ApiResponse<List<Product>>.Success(result);
                }
                catch (Exception ex)
                {
                    return ApiResponse<List<Product>>.Failure($"Error while getting products: {ex.Message}");
                }
            }
        }
    }
}
