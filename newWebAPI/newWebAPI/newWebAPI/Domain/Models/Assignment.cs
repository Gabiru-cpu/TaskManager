using System.Diagnostics.Metrics;

namespace newWebAPI.Domain.Models
{
    public class Assignment
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public bool IsCompleted { get; set; }

        public DateTime DueDate { get; set; }

        // campos usados na API do Google MAPS:
        public string Address { get; set; } = "";
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // Foreign key
        public int AssignmentListId { get; set; }

        public AssignmentList AssignmentList { get; set; }

    }
}

