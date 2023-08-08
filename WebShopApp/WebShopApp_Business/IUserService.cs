using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data.Models;

namespace WebShopApp_Business
{
    public interface IUserService
    {
        public User GetUser(int id);
        public IEnumerable<User> GetAllUsers();
        public User RegisterUser(User user);
        public User Update(User user);
        public User UpdateNoPassword(User user);
        public User GetByUsername(string username);
        public User GetByEmail(string email);
    }
}
