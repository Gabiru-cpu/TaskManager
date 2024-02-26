using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;

namespace newWebAPI.Domain.Services
{
    public interface AssignmentListService
    {
        Task<AssignmentList> CreateAssignmentList(NewAssignmentListDTO NewAssignmentListDTO);

        Task<List<AssignmentList>> GetListAssignmentListByUserId(string userId);

        Task<int> UpdateAssignmentList(UpdateAssignmentListDTO updateAssignmentListDTO);

        Task<int> DeleteAssignmentList(int AssignmentListId);
        Task<List<Assignment>> ListAssingmentByAssignmentList(int assignmentListId);

    }
}
