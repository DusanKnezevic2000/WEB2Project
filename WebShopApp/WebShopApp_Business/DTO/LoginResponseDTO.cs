
using WebShopApp_Data.Models;

namespace WebShopApp_Business.DTO
{
    public class LoginResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public Role Role { get; set; }
        public string Token { get; set; }
        public VerificationStatus Status { get; set; }

        public LoginResponseDTO(User user, string token)
        {
            Id = user.Id;
            Name = user.Name;
            Username = user.Username;
            Role = user.Role;
            Token = token;
            Status = user.Status;
        }
    }
}
