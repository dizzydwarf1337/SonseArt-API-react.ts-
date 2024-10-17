using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ICommentRepository
    {
        public Task<IEnumerable<Comment>> GetComments(Guid productId);
        public Task CreateComment(Comment comment);
        public Task UpdateComment(Guid id, Comment comment);
        public Task DeleteComment(Guid id);
    }
}
