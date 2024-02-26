namespace newWebAPI.Domain.Models
{
    public class Assignment
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public bool IsCompleted { get; set; }

        public DateTime DueDate { get; set; }

        //foreign key

        public int AssignmentListId { get; set; }

        public AssignmentList AssignmentList { get; set; }
    }
}
