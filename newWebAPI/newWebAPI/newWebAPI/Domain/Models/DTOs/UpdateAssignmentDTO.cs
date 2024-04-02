namespace newWebAPI.Domain.Models.DTOs
{
    public class UpdateAssignmentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }

        public DateTime DueDate { get; set; }
    }
}
