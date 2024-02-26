using newWebAPI.Application.Data.Repositories;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;

namespace newWebAPI.Domain.Services
{
    public interface UserService
    {
        Task<int> DeleteUser(string userId);
        Task<User> GetUserById(string userId);
        Task<bool> SignUp(SignUpDTO signUpDTO);
        Task<int> UpdateUser(User userData);
        Task<List<User>> ListUser();
    }
}
