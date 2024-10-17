using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
namespace Persistence.Repositories
{
    public class ProductRepo : IProductRepository
    {
        private readonly ApplicationContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProductRepo(ApplicationContext context, IHostingEnvironment hostEnvironment) 
        {
            _context = context;
            _hostingEnvironment = hostEnvironment;
        }
        public async Task CreateProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProduct(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null) throw new Exception("Product not found");
            if (product.Image != "productImages/blank.jpg")
            {
                var relativePath = Path.Combine("..", "client-app", "public",  product.Image);
                var filePath = Path.GetFullPath(relativePath);
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }
            var comments = await _context.Comments.Where(x => x.ProductId == id).ToListAsync();
            _context.RemoveRange(comments);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<Product> GetProduct(Guid id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p=>p.Id==id);
            if(product==null) throw new Exception("Product not found");
            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task UpdateProduct(Guid id,Product product)
        {
            var Product = await _context.Products.FindAsync(id);
            if (Product != null)
            {
                Product.Name = product.Name;
                Product.Price = product.Price;
                Product.FullDescription = product.FullDescription;
                Product.ShortDescription = product.ShortDescription;
                Product.Image = product.Image;
                _context.Products.Update(Product);
                await _context.SaveChangesAsync();
            }
        }
        public async Task UploadImage(Guid id, IFormFile? imageFile)
        {
            var Product = await _context.Products.FindAsync(id);
            if (Product != null)
            {
               if (imageFile != null)
               {
                    var relativePath = Path.Combine("..", "client-app", "public", "productImages", imageFile.FileName);
                    var filePath = Path.GetFullPath(relativePath);
                    Product.Image = "productImages/" + imageFile.FileName;
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(fileStream);
                    }
                    _context.Products.Update(Product);
                    await _context.SaveChangesAsync();
               }
            }
        }
    }
}
