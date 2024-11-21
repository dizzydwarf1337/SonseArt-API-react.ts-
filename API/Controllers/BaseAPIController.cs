using Application.Dtos;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseAPIController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        protected IActionResult HandleRequest<T> (ApiResponse<T> response)
        {
            if(response.IsSuccess && response.Data != null)
            {
                return Ok(response.Data);
            }
            if (response.IsSuccess && response.Data == null)
            {
                return NotFound();
            }
            return BadRequest();
        }
    }
}
