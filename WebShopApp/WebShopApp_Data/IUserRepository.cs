﻿using WebShopApp_Data.Models;

namespace WebShopApp_Data
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public User GetByUsername(string username);

        public User GetByEmail(string email);
    }
}
