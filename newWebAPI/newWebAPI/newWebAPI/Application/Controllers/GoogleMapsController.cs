using Microsoft.AspNetCore.Mvc;
using newWebAPI.Domain.Services;

namespace newWebAPI.Application.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GoogleMapsController : ControllerBase
    {
        private readonly GoogleMapsService _googleMapsService;

        public GoogleMapsController(GoogleMapsService googleMapsService)
        {
            _googleMapsService = googleMapsService;
        }

        [HttpGet("get-address-info")]
        public async Task<IActionResult> GetAddressInfo(string address)
        {
            var result = await _googleMapsService.GetAddressInfo(address);
            return Ok(result);
        }
    }
}
