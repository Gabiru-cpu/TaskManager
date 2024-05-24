using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;
using newWebAPI.Domain.Services;

namespace newWebAPI.Application.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpDelete("delete-user")]

        public async Task<IResult> DeleteUser([FromQuery] string userId)
        {
            try
            {
                int deleted = await _userService.DeleteUser(userId);
                return Results.Ok(deleted);
            }
            catch(Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        [HttpGet("get-user-by-id")]

        public async Task<IResult> GetUserById([FromQuery] string userId)
        {
            try
            {
                User user = await _userService.GetUserById(userId);

                return Results.Ok(user);
            }
            catch(Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }

        }

        [HttpGet("list-user")]

        public async Task<IResult> ListUser()
        {
            try
            {
                List<User> listUser = await _userService.ListUser();

                return Results.Ok(listUser);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }

        }

        [AllowAnonymous]

        [HttpPost("sign-up")]

        public async Task<IResult> SignUp([FromBody] SignUpDTO signUpDTO)
        {
            try
            {
                var response = await _userService.SignUp(signUpDTO);
                return Results.Ok(response);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        [HttpPatch("update-user-data")]

        public async Task<IResult> UpdateUser([FromBody] User user)
        {
            try
            {
                int updated = await _userService.UpdateUser(user);

                return Results.Ok(updated);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }

        }

        [AllowAnonymous]
        [HttpGet("hello-world")]
        public IActionResult HelloWorld()
        {
            return Ok("Hello World");
        }

    }
}
