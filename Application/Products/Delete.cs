using Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Hanlder : IRequestHandler<Command>
        {
            private readonly IProductRepository _productRepo;
            public Hanlder(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _productRepo.DeleteProduct(request.Id);
            }
        }
    }
}
