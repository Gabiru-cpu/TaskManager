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

    public class AssignmentController
    {
        private readonly AssignmentService _assignmentService;

        public AssignmentController(AssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpPost("create-assignment")]

        public async Task<IResult> CreateAssignment([FromBody] NewAssignmentDTO assignmentDto)
        {
            try
            {
                Assignment newAssignment = await _assignmentService.CreateAssignment(assignmentDto);
                return Results.Ok(newAssignment);

            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }

        [HttpPatch("update-assignment-status")]

        public async Task<IResult> UpdateAssignmentStatus([FromQuery]int assignmentId)
        {
            try
            {
                Assignment updatedAssignment = await _assignmentService.UpdateAssignmentStatus(assignmentId);
                return Results.Ok(updatedAssignment);

            }
            catch(Exception ex) {
                return Results.BadRequest(ex.Message);
            }

        }

        [HttpDelete("delete-assignment-by-id")]
        public async Task<IResult> DeleteAssignmentById([FromQuery]int assignmentId)
        {
            try
            {
                return Results.Ok(await _assignmentService.DeleteAssignmentById(assignmentId));
            }catch (Exception ex)
            {
                return Results.BadRequest(ex.Message);
            }
        }


    }
}
