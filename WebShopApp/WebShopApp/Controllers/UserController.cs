using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using BCryptNet = BCrypt.Net.BCrypt;
using WebShopApp.Authorization;
using WebShopApp_Business;
using WebShopApp_Data.Models;
using WebShopApp_Business.DTO;
using WebShopApp_Business.Service;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace WebShopApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IJwtUtils _jwtUtils;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public UserController(IUserService userService, IJwtUtils jwtUtils, IConfiguration config)
        {
            _userService = userService;
            _jwtUtils = jwtUtils;
            _config = config;
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

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult AuthenticateGoogle(GoogleLoginDTO info)
        {
            try
            {
                var user = _userService.GetByEmail(info.Email);

                if (user == null)
                {
                    _userService.RegisterUser(new User(
                        info.Email.Split("@")[0],
                        info.Email,
                        "",
                        info.Name,
                        DateTime.Now,
                        "",
                        Role.Customer,
                        info.Picture,
                        VerificationStatus.Approved
                        ));
                    user = _userService.GetByEmail(info.Email);
                    return Ok(new LoginResponseDTO(user, _jwtUtils.GenerateJwtToken(user)));
                }
                // authentication successful so generate jwt token
                var jwtToken = _jwtUtils.GenerateJwtToken(user);
                return Ok(new LoginResponseDTO(user, jwtToken));
            }
            catch
            {
                return BadRequest("Something went wrong.");
            }
        }

        [HttpGet]
        [Authorize(Role.Admin)]
        public List<UserDTO> GetAll()
        {
            return DTOMapper.List_User_to_UserDTO(_userService.GetAllUsers().ToList());
        }

        [HttpGet("[action]")]
        [Authorize(Role.Admin)]
        public List<UserDTO> Verifications()
        {
            return DTOMapper.List_User_to_UserDTO(_userService.GetAllUsers().Where(u => u.Role == Role.Salesman).ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public UserDTO GetById(int id)
        {
            return DTOMapper.User_To_UserDTO(_userService.GetUser(id));
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

        [HttpPut("[action]/{id}")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> Approve(int id)
        {
            User user = _userService.GetUser(id);
            if (user != null) {
                user.Status = VerificationStatus.Approved;
                _userService.Update(user);
                EmailService emailService = new EmailService(_config);
                emailService.SendApproveEmail(user.Email);
                return Ok(true);
            }
            return BadRequest(false);
        }

        [HttpPut("[action]/{id}")]
        [Authorize(Role.Admin)]
        public IActionResult Reject(int id)
        {
            User user = _userService.GetUser(id);
            if (user != null)
            {
                user.Status = VerificationStatus.Denied;
                _userService.Update(user);
                EmailService emailService = new EmailService(_config);
                emailService.SendRejectEmail(user.Email);
                return Ok(true);
            }
            return BadRequest(false);
        }

        [HttpPut]
        public IActionResult Update(UpdateUserDTO user)
        {
            User u;
            try
            {
                User usernameExists = _userService.GetByUsername(user.Username);
                if (usernameExists != null && usernameExists.Id != user.Id)
                    return BadRequest("Username is taken. Please, pick something else.");
                u = _userService.GetUser(user.Id);
                u.Address = user.Address;
                u.Username = user.Username;
                u.Name = user.Name;
                u.DateOfBirth = user.DateOfBirth;
                u.Image = user.Image;
                if (user.Password != "")
                {
                    u.Password = user.Password;
                    _userService.Update(u);
                }
                else {
                    _userService.UpdateNoPassword(u);
                }
                return Ok(DTOMapper.User_To_UserDTO(u));
            }
            catch 
            {
                return BadRequest("User not found.");

            }
        }
    }
}
