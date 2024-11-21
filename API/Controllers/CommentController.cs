using Application.Comments;
using Application.Dtos;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CommentController : BaseAPIController
    {
        [HttpPost]
        public async Task<IActionResult> CreateComment(CommentDto commentDto)
        {
            return HandleRequest(await Mediator.Send(new Create.Command { Comment = commentDto }));
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteComment(Guid Id)
        {
            return HandleRequest(await Mediator.Send(new Delete.Command { Id = Id }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(Guid id, CommentDto commentDto)
        {
            return HandleRequest(await Mediator.Send(new CommentUpdate.Command { Id = id, Comment = commentDto }));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetComments(Guid productId)
        {
            return HandleRequest(await Mediator.Send(new CommentList.Query{ ProductId = productId }));
        }
    }
}
