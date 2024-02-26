using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using newWebAPI.Domain.Models;
using newWebAPI.Domain.Models.DTOs;
using newWebAPI.Domain.Services;

namespace newWebAPI.Application.Controllers
{

    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class AssignmentListController
    {
        private readonly AssignmentListService _assignmentListService;

        public AssignmentListController(AssignmentListService assignmentListService) {
            _assignmentListService = assignmentListService;
        }

        [HttpPost("create-assignment-list")]

        public async Task<IResult> CreateAssignmentList([FromBody] NewAssignmentListDTO newAssignmentListDTO)
        {
            try
            {
                AssignmentList newAssignmentList = await _assignmentListService.CreateAssignmentList(newAssignmentListDTO);
                return Results.Ok(newAssignmentList);

            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        [HttpGet("list-assignments-by-user")]

        public async Task<IResult> GetListAssignmentListByUserId([FromQuery] string userId)
        {
            try
            {
                List<AssignmentList> listAssignmentList = await _assignmentListService.GetListAssignmentListByUserId(userId);
                return Results.Ok(listAssignmentList);

            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        [HttpPatch("update-assignment-list-name")]

        public async Task<IResult> UpdateAssignmentList([FromBody] UpdateAssignmentListDTO updateAssignmentListDTO)
        {
            try
            {
                int resp = await _assignmentListService.UpdateAssignmentList(updateAssignmentListDTO);
                return Results.Ok(resp);
            }

            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-assignment-list")]

        public async Task<IResult> DeleteAssignmentList([FromQuery] int assignmentListId)
        {
            try
            {
                int resp = await _assignmentListService.DeleteAssignmentList(assignmentListId);
                return Results.Ok(resp);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        [HttpGet("list-assignment-by-assignment-list")]

        public async Task<IResult> ListAssignmentByAssignmentList([FromQuery] int assignmentListId)
        {
            try
            {
                List<Assignment> listOfAssignment = await _assignmentListService.ListAssingmentByAssignmentList(assignmentListId);
                return Results.Ok(listOfAssignment);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

    }
}
