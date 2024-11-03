using Application.Products;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : BaseAPIController
    {
        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await Mediator.Send(new ProductList.Query());
        }
        [HttpGet("{id}")]
        public async Task<Product> GetProduct(Guid id)
        {
            return await Mediator.Send(new GetProduct.Query { Id = id });
        }
        [HttpPost]
        public async Task CreateProduct(Product product)
        {
            await Mediator.Send(new Create.Command { product = product });
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task DeleteProduct (Guid Id)
        {
            await Mediator.Send(new Delete.Command { Id = Id });
        }
        [Authorize(Roles="Admin")]
        [HttpPut("{id}")]
        public async Task UpdateProduct(Guid id, Product product)
        {
            await Mediator.Send(new ProductUpdate.Command { Id = id, product = product });
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("{id}")]
        public async Task UploadImage(Guid id, IFormFile? imageFile)
        {
            await Mediator.Send(new UploadImage.Command { Id = id, ImageFile = imageFile });
        }
    }
}
