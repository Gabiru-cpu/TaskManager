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
    public class AuthController
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]

        [HttpPost("sign-in")]

        public async Task<IResult> SignIn([FromBody] SignInDTO signInDTO)
        {
            try
            {
                SsoDTO ssoDTO = await _authService.SignIn(signInDTO);
                return Results.Ok(ssoDTO);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }


        }



    }
}
