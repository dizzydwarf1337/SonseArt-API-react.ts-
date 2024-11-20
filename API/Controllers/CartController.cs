using Application.Carts;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController : BaseAPIController
    {
        [HttpPost]
        public async Task AddProductToCart(Guid productId, Guid cartId, int quantity)
        {
            await Mediator.Send(new AddProductToCart.Command { productId = productId, cartId = cartId, Quantity = quantity });
        }
        [HttpPost("clear")]
        public async Task ClearCart(Guid cartId)
        {
            await Mediator.Send(new ClearCart.Command { cartId = cartId });
        }
        [HttpGet]
        public async Task<List<Product>> GetProducts(Guid cartId)
        {
            return await Mediator.Send(new GetProducts.Query { cartId = cartId });
        }
        [HttpPost("delete")]
        public async Task RemoveProductFromCart (Guid productId, Guid cartId)
        {
            await Mediator.Send(new RemoveProductFromCart.Command { productId = productId, cartId = cartId });
        }
        [HttpPut]
        public async Task UpdateProductQuantity(Guid productId, Guid cartId, int quantity)
        {
            await Mediator.Send(new UpdateProductQuantity.Command { productId = productId, cartId = cartId, Quantity = quantity });
        }
    }
}
