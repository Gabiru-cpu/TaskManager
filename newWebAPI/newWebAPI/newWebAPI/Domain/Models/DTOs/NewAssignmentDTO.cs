namespace newWebAPI.Domain.Models.DTOs
{
    public class NewAssignmentDTO
    {

        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public DateTime DueDate { get; set; }

        public int AssignmentListId { get; set; }
    }
}
