using newWebAPI.Application.Data.Repositories;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;

namespace newWebAPI.Domain.Services.Implementation
{
    public class AssignmentServiceImpl : AssignmentService
    {
        AssignmentRepository _assignmentRepository;
        AssignmentListRepository _assignmentListRepository;
        
        private readonly GoogleMapsService _googleMapsService;

        public AssignmentServiceImpl(AssignmentRepository assignmentRepository, 
            AssignmentListRepository assignmentListRepository, 
            GoogleMapsService googleMapsService)
        {
            _assignmentRepository = assignmentRepository;
            _assignmentListRepository = assignmentListRepository;
            _googleMapsService = googleMapsService;
        }

        public async Task<Assignment> CreateAssignment(NewAssignmentDTO assignmentDTO)
        {
            DateTime assignmentDate = DateTime.Now;
            
            if (assignmentDTO.Title == "" || assignmentDTO.Title == null)
                throw new ArgumentException("Título da tarefa precisa ter um valor");

            if (await _assignmentListRepository.GetAssignmentListById(assignmentDTO.AssignmentListId) == null)
                throw new ArgumentException("A lista à qual a tarefa pertence está inválida");

            // TODO: validar data ainda nao feito
            //if(assignmentDTO.DueDate != null)
            //    assignmentDate = assignmentDTO.DueDate;

            Assignment newAssignment = new Assignment();
            newAssignment.Title = assignmentDTO.Title;
            newAssignment.Description = assignmentDTO.Description;
            newAssignment.DueDate = assignmentDTO.DueDate;
            newAssignment.IsCompleted = false;
            newAssignment.AssignmentListId = assignmentDTO.AssignmentListId;

            string formattedAddress = _googleMapsService.FormatAddressForUrl(assignmentDTO.Address);
            newAssignment.Address = formattedAddress;

            newAssignment.Latitude = assignmentDTO.Latitude;
            newAssignment.Longitude = assignmentDTO.Longitude;

            Assignment createdAssignment = await _assignmentRepository.CreateAssignment(newAssignment);

            return newAssignment;
        }

        public async Task<Assignment> UpdateToCompleteAssignmentStatus(int assignmentId)
        {
            Assignment assignment = await _assignmentRepository.GetAssignmentById(assignmentId);

            if (assignment == null)
            {
                throw new ArgumentException("Assignment could not be found");
            }

            Assignment updatedAssignment = assignment;
            if(assignment.IsCompleted)
            {
                updatedAssignment.IsCompleted = false;
            }
            else
            {
                updatedAssignment.IsCompleted = true;
            }
            
            int updatedLines = await _assignmentRepository.UpdateAssignment(assignment, updatedAssignment);

            if (updatedLines == 0)
            {
                throw new ArgumentException("Assignment could not be updated");
            }

            return updatedAssignment;
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

        public async Task<int> UpdateAssignment(UpdateAssignmentDTO updateAssignmentDTO)
        {
            Assignment assignment = await _assignmentRepository.GetAssignmentById(updateAssignmentDTO.Id);

            if (assignment == null)  throw new ArgumentException("Assignment could not be found");

            if (updateAssignmentDTO.Title == null || updateAssignmentDTO.Title == "")
                throw new ArgumentException("Inserir o novo titulo");

            Assignment newAssignment = assignment;

            newAssignment.Title = updateAssignmentDTO.Title;
            newAssignment.Description = updateAssignmentDTO.Description;
            newAssignment.IsCompleted = updateAssignmentDTO.IsCompleted;
            newAssignment.DueDate = updateAssignmentDTO.DueDate;

            string formattedAddress = _googleMapsService.FormatAddressForUrl(updateAssignmentDTO.Address);
            newAssignment.Address = formattedAddress;

            newAssignment.Latitude = updateAssignmentDTO.Latitude;
            newAssignment.Longitude = updateAssignmentDTO.Longitude;

            int response = await _assignmentRepository.UpdateAssignment(assignment, newAssignment);

            return response;
        }

        public async Task<bool> DeleteAssignmentById(int assignmentId)
        {
            Assignment assignment = await _assignmentRepository.GetAssignmentById(assignmentId);

            if (assignment == null)
            {
                throw new ArgumentException("Assignment could not be found");
            }

            int deletedRows = await _assignmentRepository.DeleteAssignment(assignment);

            if (deletedRows == 0)
            {
                throw new ArgumentException("Assignment could not be deleted");
            }

            return true;
        }

    }
}
