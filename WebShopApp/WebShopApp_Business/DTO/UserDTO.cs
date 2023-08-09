using System;
using WebShopApp_Data.Models;

namespace WebShopApp_Business.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public Role Role { get; set; }
        public string Image { get; set; }
        public VerificationStatus Status { get; set; }

        public UserDTO(int id, string username, string email, string password, string name, DateTime dateOfBirth, string address, Role role, string image, VerificationStatus status)
        {
            Id = id;
            Username = username;
            Email = email;
            Password = password;
            Name = name;
            DateOfBirth = dateOfBirth;
            Address = address;
            Role = role;
            Image = image;
            Status = status;
        }
    }
}
