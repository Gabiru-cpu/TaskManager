﻿namespace newWebAPI.Domain.Models.DTOs
{
    public class SignUpDTO
    {

        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public string UserName { get; set; } = "";
        public string PasswordConfirm { get; set; } = "";

    }
}
