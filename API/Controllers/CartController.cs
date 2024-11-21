using Application.Carts;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController : BaseAPIController
    {
        [HttpPost]
        public async Task<IActionResult> AddProductToCart(Guid productId, Guid cartId, int quantity)
        {
            return HandleRequest(await Mediator.Send(new AddProductToCart.Command { productId = productId, cartId = cartId, Quantity = quantity }));
        }
        [HttpPost("clear")]
        public async Task<IActionResult> ClearCart(Guid cartId)
        {
            return HandleRequest(await Mediator.Send(new ClearCart.Command { cartId = cartId }));
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts(Guid cartId)
        {
            return HandleRequest(await Mediator.Send(new GetProducts.Query { cartId = cartId }));
        }
        [HttpPost("delete")]
        public async Task<IActionResult> RemoveProductFromCart (Guid productId, Guid cartId)
        {
            return HandleRequest(await Mediator.Send(new RemoveProductFromCart.Command { productId = productId, cartId = cartId }));
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProductQuantity(Guid productId, Guid cartId, int quantity)
        {
            return HandleRequest(await Mediator.Send(new UpdateProductQuantity.Command { productId = productId, cartId = cartId, Quantity = quantity }));
        }
    }
}
