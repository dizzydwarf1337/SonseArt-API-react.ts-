using Application.Dtos;
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
        public class Command : IRequest<ApiResponse<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Hanlder : IRequestHandler<Command,ApiResponse<Unit>>
        {
            private readonly IProductRepository _productRepo;
            public Hanlder(IProductRepository productRepo)
            {
                _productRepo = productRepo;
            }
            public async Task<ApiResponse<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await _productRepo.DeleteProduct(request.Id);
                    return ApiResponse<Unit>.Success(Unit.Value);
                }
                catch (Exception ex)
                {
                    return ApiResponse<Unit>.Failure($"Error while deleting product: {ex.Message}");
                }
            }
        }
    }
}
