

using newWebAPI.Domain.Models.DTOs;

namespace newWebAPI.Domain.Services
{
    public interface AuthService
    {
        public Task<SsoDTO> SignIn(SignInDTO signInDTO);    
    }

}
