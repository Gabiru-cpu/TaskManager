using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace newWebAPI.Domain.Models
{
    public class User : IdentityUser
    {
        [JsonIgnore]

        public List<AssignmentList> ListAssignmentList { get; set; } = new List<AssignmentList>();

    }
}
