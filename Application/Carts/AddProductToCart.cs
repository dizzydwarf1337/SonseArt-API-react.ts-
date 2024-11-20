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
        public class Command : IRequest
        {
            public Guid cartId;
            public Guid productId;
            public int Quantity;
        }
        public class Handler : IRequestHandler<Command>
        {
            private ICartRepository _cartRepositoty;
            public Handler(ICartRepository cartRepository)
            {
                _cartRepositoty = cartRepository;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _cartRepositoty.AddProductToCart(request.productId, request.cartId, request.Quantity);  
            }
        }
    }
}
