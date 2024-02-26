using newWebAPI.Application.Data.Repositories;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;

namespace newWebAPI.Domain.Services.Implementation
{
    public class AssignmentServiceImpl : AssignmentService
    {
        AssignmentRepository _assignmentRepository;
        AssignmentListRepository _assignmentListRepository;

        public AssignmentServiceImpl(AssignmentRepository assignmentRepository, AssignmentListRepository assignmentListRepository)
        {
            _assignmentRepository = assignmentRepository;
            _assignmentListRepository = assignmentListRepository;
        }

        public async Task<Assignment> CreateAssignment(NewAssignmentDTO assignmentDTO)
        {
            DateTime assignmentDate = DateTime.Now;
            
            if (assignmentDTO.Title == "" || assignmentDTO.Title == null)
                throw new ArgumentException("Título da tarefa precisa ter um valor");

            if (await _assignmentListRepository.GetAssignmentListById(assignmentDTO.AssignmentListId) == null)
                throw new ArgumentException("A lista à qual a tarefa pertence está inválida");

            // não sei como validar DateTime
            //if(assignmentDTO.DueDate != null)
            //    assignmentDate = assignmentDTO.DueDate;

            Assignment newAssignment = new Assignment();
            newAssignment.Title = assignmentDTO.Title;
            newAssignment.Description = assignmentDTO.Description;
            newAssignment.DueDate = assignmentDTO.DueDate;
            newAssignment.IsCompleted = false;
            newAssignment.AssignmentListId = assignmentDTO.AssignmentListId;

            Assignment createdAssignment = await _assignmentRepository.CreateAssignment(newAssignment);

            return newAssignment;
        }

        public async Task<Assignment> UpdateAssignmentStatus(int assignmentId)
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
