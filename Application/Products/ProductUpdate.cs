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
    public class ProductUpdate
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public Product product { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly IProductRepository _productRepo;
            public Handler (IProductRepository productRepo)
            {
                _productRepo=productRepo;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            { 
                await _productRepo.UpdateProduct(request.Id,request.product); 
            }
        }
    }
}
