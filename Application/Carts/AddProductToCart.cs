using Application.Dtos;
using Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts
{
    public class AddProductToCart
    {
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Guid cartId;
            public Guid productId;
            public int Quantity;
        }
        public class Handler : IRequestHandler<Command,ApiResponse<Unit>>
        {
            private ICartRepository _cartRepositoty;
            public Handler(ICartRepository cartRepository)
            {
                _cartRepositoty = cartRepository;
            }
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await _cartRepositoty.AddProductToCart(request.productId, request.cartId, request.Quantity);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex) 
                {
                    return ApiResponse<Unit>.Failure($"Error while adding product to cart: {ex.Message}");
                }
            }
        }
    }
}
