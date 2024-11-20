using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ICartRepository
    {
        public Task<List<Product>> GetProducts(Guid cartId);
        public  Task AddProductToCart(Guid productId, Guid cartId, int quantity);
        public  Task RemoveProductFromCart(Guid productId, Guid cartId);
        public Task UpdateProductQuantity(Guid productId, Guid cartId, int quantity);
        public Task ClearCart(Guid cartId);
    }
}
