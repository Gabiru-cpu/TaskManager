using System.Text.Json.Serialization;

namespace newWebAPI.Domain.Models
{
    public class AssignmentList
    {

        public int Id { get; set; }

        public string Name { get; set; } = "";

        //foreign key
        public string UserId { get; set; } = "";

        public User User { get; set; }

        [JsonIgnore] // Para não gerar loop infinito: TaskList tem várias tasks, cada task tem uma tasklist que tem várias tasks....
        List<Assignment> Assignment { get; set;}
    }
}
