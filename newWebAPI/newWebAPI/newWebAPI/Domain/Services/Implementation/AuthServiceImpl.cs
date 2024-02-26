using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using newWebAPI.Application.Data.Repositories;
using newWebAPI.Domain.Models.DTOs;
using newWebAPI.Domain.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace newWebAPI.Domain.Services.Implementation
{
    public class AuthServiceImpl : AuthService
    {
        private readonly UserManager<User> _userManager;

        private readonly UserRepository _userRepository;

        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly SignInManager<User> _signInManager;

        public AuthServiceImpl(UserManager<User> manager, UserRepository repository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, SignInManager<User> signInManager)
        {
            _userManager = manager;
            _userRepository = repository;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _signInManager = signInManager;
        }

        public async Task<SsoDTO> SignIn(SignInDTO signInDTO)
        {
            User user = await _userRepository.GetUserByUserName(signInDTO.UserName);

            if (user == null)
                throw new ArgumentException("Usuário com este nome não encontrado");

            if (!await _userManager.CheckPasswordAsync(user, signInDTO.Password))
                throw new ArgumentException("Senha incorreta");

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var temp = _configuration["JWT:Secret"];

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(temp));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
             );

            return new SsoDTO(new JwtSecurityTokenHandler().WriteToken(token), token.ValidTo, user);
        }
    }
}