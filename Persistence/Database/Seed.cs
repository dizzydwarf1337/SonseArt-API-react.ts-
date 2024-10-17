using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Database
{
    public static class Seed
    {
        public static void SeedData(ApplicationContext context)
        {
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Name = "Product 1",
                        Price = 100,
                        FullDescription = "Full Description 1",
                        ShortDescription = "Short Description 1",
                        Image = "https://via.placeholder.com/150"
                    },
                    new Product
                    {
                        Name = "Product 2",
                        Price = 200,
                        FullDescription = "Full Description 2",
                        ShortDescription = "Short Description 2",
                        Image = "https://via.placeholder.com/150"
                    },
                    new Product
                    {
                        Name = "Product 3",
                        Price = 300,
                        FullDescription = "Full Description 3",
                        ShortDescription = "Short Description 3",
                        Image = "https://via.placeholder.com/150"
                    }
                };
                context.Products.AddRange(products);
                context.SaveChanges();
            }
        }
    }
}
