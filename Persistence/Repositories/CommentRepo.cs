using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;

namespace Persistence.Repositories
{
    public class CommentRepo : ICommentRepository
    {
        private readonly ApplicationContext _context;
        public CommentRepo(ApplicationContext context)
        {
            _context = context;
        }
        public async Task CreateComment(Comment comment)
        {
            var product = await _context.Products.FindAsync(comment.ProductId);
            if (product == null) throw new Exception("Product not found");
            comment.Product = product;
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteComment(Guid id)
        {
            var comment = await _context.Comments.Include(c=>c.Product).FirstOrDefaultAsync(x => x.Id == id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
                comment.Product.Comments.Remove(comment);
            }
            
        }
        public async Task<IEnumerable<Comment>> GetComments(Guid productId)
        {
            return await _context.Comments.Where(x => x.ProductId == productId).ToListAsync();
        }

        public async Task UpdateComment(Guid id, Comment comment)
        {
            var Comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (Comment != null)
            {
                Comment.Text = comment.Text;
                Comment.Updated = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}
