using newWebAPI.Application.Data.Repositories;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;

namespace newWebAPI.Domain.Services
{
    public interface AssignmentService
    {  
        Task<Assignment> CreateAssignment(NewAssignmentDTO assignmentDTO);

        Task<Assignment> UpdateAssignmentStatus(int assignmentId);
        Task<bool> DeleteAssignmentById(int assignmentId);
    }
}
