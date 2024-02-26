using newWebAPI.Application.Data.Repositories;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;

namespace newWebAPI.Domain.Services.Implementation
{
    public class UserServiceImpl : UserService
    {
        private readonly UserRepository _repository;

        public UserServiceImpl(UserRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> DeleteUser(string userId)
        {

            User findUser = await _repository.GetUserById(userId);

            if (findUser == null)
                throw new ArgumentException("Usuário não encontrado");

            return await _repository.DeleteUser(findUser);

        }

        public async Task<User> GetUserById(string userId)
        {
            User user = await _repository.GetUserById(userId);

            if (user == null)
                throw new ArgumentException("Usuário não encontrado");

            return(user);
        }

        public async Task<List<User>> ListUser()
        {
            List<User> listUser = await _repository.ListUser();

            return (listUser);
        }

        public async Task<bool> SignUp(SignUpDTO signUpDTO)
        {
            string password = signUpDTO.Password;

            if (password != signUpDTO.PasswordConfirm)
                throw new ArgumentException("Senhas devem ser iguais");

            if (await _repository.GetUserByUserName(signUpDTO.UserName) != null)
                throw new ArgumentException("Nome de usuário já está em uso");

            User newUser = new User();

            newUser.UserName = signUpDTO.UserName;
            newUser.SecurityStamp = Guid.NewGuid().ToString();
            newUser.Email = signUpDTO.Email;

            var response = await _repository.CreateUser(newUser, password);

            if (!response)
                throw new ArgumentException("Falha no cadastro de usuário");

            return true;

        }

        public async Task<int> UpdateUser(User userData)
        {

            if (userData.Id == null)
                throw new ArgumentException("Id do usuário não pode ser nulo");
            // TESTAR E ARRUMAR ESSA VALIDAÇÃO
            User findUser = await _repository.GetUserById(userData.Id);

            if (findUser == null)
                throw new ArgumentException("Usuário não encontrado");

            User updatedUser = findUser;

            if(userData.UserName != null && userData.UserName.Length > 0)
                updatedUser.UserName = userData.UserName;
            if (userData.Email != null && userData.Email.Length > 0)
                updatedUser.Email = userData.Email;

            int response = await _repository.UpdateUser(findUser, updatedUser);

            return response;
        }

    }
}
