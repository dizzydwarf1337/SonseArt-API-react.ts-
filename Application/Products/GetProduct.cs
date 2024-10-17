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
        public class Query : IRequest<Product>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Product>
        {
            private readonly IProductRepository _productRepo;
            public Handler(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _productRepo.GetProduct(request.Id);
            }
        }
    }
}
