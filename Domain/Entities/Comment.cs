using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(200)]
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
        [ForeignKey(nameof(Product))]
        public Guid ProductId { get; set; }
        public bool Updated { get; set; } = false!;
        [NotMapped]
        public Product Product { get; set; }

        public Comment() { }
        public Comment(string Text, DateTime CreatedAt, Guid ProductId)
        {
            Id = Guid.NewGuid();
            this.Text = Text;
            this.CreatedAt = CreatedAt;
            this.ProductId = ProductId;
        }
    }
}
