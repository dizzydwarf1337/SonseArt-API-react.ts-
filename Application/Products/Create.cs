using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class Create
    {
        
        public class Command : IRequest
        {
            public Product product;
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly IProductRepository _productRepo;
            public Handler(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
               await _productRepo.CreateProduct(request.product);
            }
        }
    }
}
