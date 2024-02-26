using newWebAPI.Application.Data.Contexts;
using newWebAPI.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace newWebAPI.Application.Data.Repositories
{
    public class UserRepository
    {

        private readonly MySQLContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(MySQLContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<bool> CreateUser(User user, string password)
        {
            var response = await _userManager.CreateAsync(user, password);

            return response.Succeeded;
        }

        public async Task<int> DeleteUser(User user)
        {
            _context.User.Remove(user);

            return await _context.SaveChangesAsync();

        }

        public async Task<List<User>> ListUser()
        {
            List<User> listUser = await _context.User.ToListAsync();

            return listUser;

        }

        public async Task<User> GetUserById(string userId)
        {
            User? user = await _context.User.FindAsync(userId);

            return user!;
        }

        public async Task<User> GetUserByUserName(string userName)
        {
            User? user = await _context.User.FirstOrDefaultAsync((u) => u.UserName == userName);

            return user!;    
        }

        public async Task<int> UpdateUser(User user, User updatedValues)
        {
            _context.Entry<User>(user).CurrentValues.SetValues(updatedValues);

            return await _context.SaveChangesAsync();

        }

        //public async Task<bool> DeleteUser(User user)
        //{

        //}
    }
}
