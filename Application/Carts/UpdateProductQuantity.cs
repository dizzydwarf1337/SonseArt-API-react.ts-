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
    public class UpdateProductQuantity
    {
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Guid cartId { get; set; }
            public Guid productId { get; set; }
            public int Quantity { get; set; }
        }
        public class Handler : IRequestHandler<Command, ApiResponse<Unit>>
        {
            private ICartRepository _cartRepository;
            public Handler(ICartRepository cartRepository)
            {
                _cartRepository = cartRepository;
            }
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await _cartRepository.UpdateProductQuantity(request.productId, request.cartId, request.Quantity);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex) 
                {
                    return ApiResponse<Unit>.Failure($"Error while updating Quantity: {ex.Message}");
                }
            }
        }
    }
}
