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
        public async Task<IActionResult> GetProducts()
        {
            return HandleRequest(await Mediator.Send(new ProductList.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            return HandleRequest(await Mediator.Send(new GetProduct.Query { Id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            return HandleRequest(await Mediator.Send(new Create.Command { product = product }));
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct (Guid Id)
        {
            return HandleRequest(await Mediator.Send(new Delete.Command { Id = Id }));
        }
        [Authorize(Roles="Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, Product product)
        {
            return HandleRequest(await Mediator.Send(new ProductUpdate.Command { Id = id, product = product }));
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("{id}")]
        public async Task<IActionResult> UploadImage(Guid id, IFormFile? imageFile)
        {
            return HandleRequest(await Mediator.Send(new UploadImage.Command { Id = id, ImageFile = imageFile }));
        }
    }
}
