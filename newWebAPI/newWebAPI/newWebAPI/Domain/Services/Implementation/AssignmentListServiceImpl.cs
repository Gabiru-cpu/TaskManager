using newWebAPI.Application.Data.Repositories;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;
using System.Security.Cryptography.X509Certificates;

namespace newWebAPI.Domain.Services.Implementation
{
    public class AssignmentListServiceImpl : AssignmentListService
    {

        private readonly AssignmentListRepository _assignmentListRepository;
        private readonly UserRepository _userRepository;
        private readonly AssignmentRepository _assignmentRepository;//Pode colocar a AssingmnetRepository aqui?

        public AssignmentListServiceImpl(AssignmentListRepository assignmentListRepository, UserRepository userRepository, AssignmentRepository assignmentRepository)
        {
            _assignmentListRepository = assignmentListRepository;
            _userRepository = userRepository;
            _assignmentRepository = assignmentRepository;
        }
        
        public async Task<AssignmentList> CreateAssignmentList(NewAssignmentListDTO newAssignmentListDTO)
        {

            User listOwner = await _userRepository.GetUserById(newAssignmentListDTO.userId);

            if (listOwner == null)
                throw new ArgumentException("Usuário não encontrado");

            AssignmentList assignmentList = new AssignmentList();

            assignmentList.Name = newAssignmentListDTO.Name;
            assignmentList.UserId = newAssignmentListDTO.userId;
            assignmentList.User = listOwner;

            AssignmentList newAssignmentList = await _assignmentListRepository.CreateAssignmentList(assignmentList);

            if (newAssignmentList == null)
                throw new ArgumentException("Falha no cadastro da lista de atividades");

            return newAssignmentList;
        }

        public async Task<List<AssignmentList>> GetListAssignmentListByUserId(string userId)
        {
            List<AssignmentList> listAssignmentList = await _assignmentListRepository.GetListAssignmentListByUserId(userId);

            return listAssignmentList;
        }

        public async Task<int> UpdateAssignmentList(UpdateAssignmentListDTO updateAssignmentListDTO)
        {   
            AssignmentList listToUpdate = await _assignmentListRepository.GetAssignmentListById(updateAssignmentListDTO.Id);

            if (listToUpdate == null)
                throw new ArgumentException("Lista não encontrada");

            if (updateAssignmentListDTO.NewName == null || updateAssignmentListDTO.NewName == "")
                throw new ArgumentException("Inserir o novo nome");

            AssignmentList newAssignmentList = listToUpdate;

            newAssignmentList.Name = updateAssignmentListDTO.NewName;

            int response = await _assignmentListRepository.UpdateAssignmentList(listToUpdate, newAssignmentList);

            return response;
        }

        public async Task<int> DeleteAssignmentList(int assignmentListId)
        {
            AssignmentList assignmentListToDelete = await _assignmentListRepository.GetAssignmentListById(assignmentListId);

            if (assignmentListToDelete == null) 
                throw new ArgumentException("Lista não encontrada");

            int response = await _assignmentListRepository.DeleteAssignmentList(assignmentListToDelete);

            return response;

        }

        public async Task<List<Assignment>> ListAssingmentByAssignmentList(int assignmentListId)
        {
            AssignmentList assignmentList = await _assignmentListRepository.GetAssignmentListById(assignmentListId);

            if (assignmentList == null)
            {
                throw new ArgumentException("Could not find Assignment List");
            }

            List<Assignment> listOfAssignment = await _assignmentRepository.ListAssignmentByAssigmentList(assignmentListId);

            return listOfAssignment;
        }


    }
}
