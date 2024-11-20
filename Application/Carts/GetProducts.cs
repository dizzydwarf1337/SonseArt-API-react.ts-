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
        public class Query : IRequest<List<Product>>
        {
            public Guid cartId { get; set; }
        }
        public class Handler : IRequestHandler<Query, List<Product>>
        {
            private ICartRepository _cartRepository;
            public Handler(ICartRepository cartRepository)
            {
                _cartRepository = cartRepository;
            }
            public async Task<List<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _cartRepository.GetProducts(request.cartId);
            }
        }
    }
}
