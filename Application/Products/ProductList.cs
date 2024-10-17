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
        public class Query : IRequest<IEnumerable<Product>>
        {
        }
        public class Handler : IRequestHandler<Query, IEnumerable<Product>>
        {
            private readonly IProductRepository _productRepo;
            public Handler(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task<IEnumerable<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _productRepo.GetProducts();
            }
        }
    }
}
