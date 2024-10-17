using Application.Comments;
using Application.Dtos;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentController : BaseAPIController
    {
        [HttpPost]
        public async Task CreateComment(CommentDto commentDto)
        {
            await Mediator.Send(new Create.Command { Comment = commentDto });
        }
        [HttpDelete("{Id}")]
        public async Task DeleteComment(Guid Id)
        {
            await Mediator.Send(new Delete.Command { Id = Id });
        }
        [HttpPut("{id}")]
        public async Task UpdateComment(Guid id, CommentDto commentDto)
        {
            await Mediator.Send(new CommentUpdate.Command { Id = id, Comment = commentDto });
        }
        [HttpGet("{id}")]
        public async Task<ICollection<CommentDto>> GetComments(Guid productId)
        {
            return await Mediator.Send(new CommentList.Query{ ProductId = productId });
        }
    }
}
