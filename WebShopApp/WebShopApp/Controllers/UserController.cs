﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using BCryptNet = BCrypt.Net.BCrypt;
using WebShopApp.Authorization;
using WebShopApp_Business;
using WebShopApp_Data.Models;
using WebShopApp_Business.DTO;
using WebShopApp_Business.Service;
using System.Linq;

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
        public List<UserDTO> GetAll()
        {
            return DTOMapper.List_User_to_UserDTO(_userService.GetAllUsers().ToList());
        }

        [HttpGet("[action]")]
        //[Authorize(Role.Admin)]
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
        [AllowAnonymous]
        public IActionResult Approve(int id)
        {
            User user = _userService.GetUser(id);
            if (user != null) {
                user.Status = VerificationStatus.Approved;
                _userService.Update(user);
                return Ok(true);
            }
            return BadRequest(false);
        }

        [HttpPut("[action]/{id}")]
        [AllowAnonymous]
        public IActionResult Reject(int id)
        {
            User user = _userService.GetUser(id);
            if (user != null)
            {
                user.Status = VerificationStatus.Denied;
                _userService.Update(user);
                return Ok(true);
            }
            return BadRequest(false);
        }

        [HttpPut]
        [AllowAnonymous]
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
                    u.Password = user.Password;
                _userService.Update(u);
                return Ok(DTOMapper.User_To_UserDTO(u));
            }
            catch 
            {
                return BadRequest("User not found.");

            }
        }
    }
}
