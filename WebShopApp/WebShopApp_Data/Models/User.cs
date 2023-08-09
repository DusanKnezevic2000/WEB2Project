using System;

namespace WebShopApp_Data.Models
{
    public class User : Entity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public Role Role { get; set; }
        public string Image { get; set; }
        public VerificationStatus Status { get; set; }

        public User()
        {

        }

        public User(string username, string email, string password, string name, DateTime dateOfBirth, string address, Role role, string image, VerificationStatus status)
        {
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
