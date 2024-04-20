namespace newWebAPI.Domain.Services
{
    public interface GoogleMapsService
    {
        public Task<string> GetAddressInfo(string address);
        public string FormatAddressForUrl(string address);
    }
}
