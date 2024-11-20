using Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Carts
{
    public class RemoveProductFromCart
    {
        public class Command : IRequest
        {
            public Guid cartId { get; set; }
            public Guid productId { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private ICartRepository _cartRepository;
            public Handler(ICartRepository cartRepository)
            {
                _cartRepository = cartRepository;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _cartRepository.RemoveProductFromCart(request.productId, request.cartId);
            }
        }
    }
}
