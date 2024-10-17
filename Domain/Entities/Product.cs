using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string FullDescription { get; set; }
        public string ShortDescription { get; set; }
        public string? Image { get; set; }
        [NotMapped]
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
