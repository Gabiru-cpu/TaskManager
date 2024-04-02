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

        [HttpPatch("complete-assignment-status")]

        public async Task<IResult> UpdateToCompleteAssignmentStatus([FromQuery]int assignmentId)
        {
            try
            {
                Assignment updatedStatus = await _assignmentService.UpdateToCompleteAssignmentStatus(assignmentId);
                return Results.Ok(updatedStatus);

            }
            catch(Exception ex) {
                return Results.BadRequest(ex.Message);
            }

        }

        [HttpPatch("update-assignment")]

        public async Task<IResult> UpdateAssignment([FromBody] UpdateAssignmentDTO updateAssignmentDTO)
        {
            try
            {
                int resp = await _assignmentService.UpdateAssignment(updateAssignmentDTO);
                return Results.Ok(resp);
            }
            catch (Exception ex)
            {
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
