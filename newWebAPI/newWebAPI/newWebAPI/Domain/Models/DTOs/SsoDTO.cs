namespace newWebAPI.Domain.Models.DTOs
{
    public class SsoDTO
    {
        public string AccessToken { get; set; }
        public DateTime Expiration { get; set; }
        public User CurrentUser { get; set; }

        public SsoDTO(string accessToken, DateTime expiration, User currentUser)
        {
            this.AccessToken = accessToken;
            this.Expiration = expiration;
            this.CurrentUser = currentUser;
        }
    }
}
