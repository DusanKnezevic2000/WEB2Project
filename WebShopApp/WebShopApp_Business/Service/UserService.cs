using AutoMapper;
using BCrypt.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data;
using WebShopApp_Data.Models;

namespace WebShopApp_Business.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public User GetByUsername(string username)
        {
            return _userRepository.GetByUsername(username);
        }

        public User GetByEmail(string email)
        {
            return _userRepository.GetByEmail(email);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userRepository.GetAll();
        }

        public User GetUser(int id)
        {
            return _userRepository.GetById(id);
        }

        public User RegisterUser(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            if (user.Role == Role.Salesman)
                user.Status = VerificationStatus.Processing;
            else
                user.Status = VerificationStatus.Approved;
            return _userRepository.Insert(user);
        }

        public User Update(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            return _userRepository.Update(user);
        }
    }
}
