using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class UploadImage
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public IFormFile? ImageFile { get; set; }
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
                await _productRepo.UploadImage(request.Id, request.ImageFile);
            }
        }
    }
}
