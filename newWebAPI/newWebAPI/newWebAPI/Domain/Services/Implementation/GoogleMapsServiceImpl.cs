using System.Text.RegularExpressions;

namespace newWebAPI.Domain.Services.Implementation
{
    public class GoogleMapsServiceImpl : GoogleMapsService
    {
        private readonly HttpClient _httpClient;

        public GoogleMapsServiceImpl(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetAddressInfo(string address)
        {
            address = FormatAddressForUrl(address);

            var apiKey = "SUA-CHAVE";
            var url = $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={apiKey}";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            return json;

        }

        public string FormatAddressForUrl(string address)
        {
            // Substitui espaços por "%20" e caracteres especiais por suas representações UTF-8
            string formattedAddress = Regex.Replace(address, @"\s", "%20");
            formattedAddress = Regex.Replace(formattedAddress, @"([^a-zA-Z0-9%._-])", m =>
                m.Value != "," ? Uri.EscapeDataString(m.Value) : m.Value
            );

            return formattedAddress;
        }
    }
}
