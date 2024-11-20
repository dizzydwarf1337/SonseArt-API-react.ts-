using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class CartRepo : ICartRepository
    {
        private readonly ApplicationContext _context;
        public CartRepo(ApplicationContext context) {
            _context = context;
        }
        public async Task AddProductToCart(Guid productId, Guid cartId, int quantity)
        {
            await _context.CartProducts.AddAsync(new CartProduct
            {
                CartId = cartId,
                ProductId = productId,
                Quantity = quantity
            });
            await _context.SaveChangesAsync();
        }

        public async Task ClearCart(Guid cartId)
        {
            _context.CartProducts.RemoveRange(_context.CartProducts.Where(x => x.CartId == cartId));
            await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetProducts(Guid cartId)
        {
           return await _context.CartProducts.Where(x => x.CartId == cartId).Include(x=>x.Product).Select(x => x.Product).ToListAsync();
        }

        public async Task RemoveProductFromCart(Guid productId, Guid cartId)
        {
            var CartProduct = await _context.CartProducts.FirstOrDefaultAsync(x => x.ProductId == productId && x.CartId == cartId);
            if (CartProduct != null)
            {
                _context.CartProducts.Remove(CartProduct);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateProductQuantity(Guid productId, Guid cartId, int quantity)
        {
            var CartProduct = await _context.CartProducts.FirstOrDefaultAsync(x => x.ProductId == productId && x.CartId == cartId);
            if (CartProduct != null)
            {
                CartProduct.Quantity = quantity;
                await _context.SaveChangesAsync();
            }
        }
    }
}
