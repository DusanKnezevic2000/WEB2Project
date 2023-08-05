using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using BCryptNet = BCrypt.Net.BCrypt;
using WebShopApp.Authorization;
using WebShopApp_Business;
using WebShopApp_Data.Models;
using WebShopApp_Business.DTO;
using WebShopApp_Business.Service;

namespace WebShopApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IJwtUtils _jwtUtils;
        private readonly IUserService _userService;

        public UserController(IUserService userService, IJwtUtils jwtUtils)
        {
            _userService = userService;
            _jwtUtils = jwtUtils;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Authenticate(LoginDTO model)
        {
            var user = _userService.GetByEmail(model.Email);

            // validate
            if (user == null || !BCryptNet.Verify(model.Password, user.Password))
                return BadRequest("Wrong credentials. Please, try again.");

            // authentication successful so generate jwt token
            var jwtToken = _jwtUtils.GenerateJwtToken(user);
            return Ok(new LoginResponseDTO(user, jwtToken));
        }

        [HttpGet]
        //[Authorize(Role.Admin)]
        public IEnumerable<User> GetAll()
        {
            return _userService.GetAllUsers();
        }

        [HttpGet]
        [Route("{id}")]
        public User GetById(int id)
        {
            return _userService.GetUser(id);
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult RegisterUser(UserDTO user)
        {
            if (_userService.GetByEmail(user.Email) != null)
                return BadRequest("User with provided email already exists.");
            if (_userService.GetByUsername(user.Username) != null)
                return BadRequest("Username is taken. Please, pick something else.");
            return Ok(_userService.RegisterUser(DTOMapper.UserDTO_To_User(user)));
        }

        [HttpPut]
        [AllowAnonymous]
        public User Update(User user)
        {
            return _userService.Update(user);
        }
    }
}
