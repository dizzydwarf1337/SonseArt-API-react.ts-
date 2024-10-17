using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IProductRepository
    {
        public Task<IEnumerable<Product>> GetProducts();
        public Task<Product> GetProduct(Guid id);
        public Task CreateProduct(Product product);
        public Task UpdateProduct(Guid id, Product product);
        public Task DeleteProduct(Guid id);
        public Task UploadImage(Guid id, IFormFile? imageFile);
    }
}
