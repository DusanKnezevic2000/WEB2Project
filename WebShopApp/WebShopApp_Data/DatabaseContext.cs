using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data.Models;

namespace WebShopApp_Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DatabaseContext()
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(user =>
            {
                user.HasData(
                    new User()
                    {
                        Id = -1,
                        Username = "admin",
                        //jabuka123
                        Password = "$2a$10$UVn74F/yEiUzKWBSGVyzHe2UfpVJ95zY50Q8bz1RFyrAYVfwFAj4i",
                        Email = "johndoe@gmail.com",
                        Name = "John Doe",
                        Address = "Novi Sad",
                        Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
                        Role = Role.Admin,
                        DateOfBirth = new DateTime(1995, 06, 25),
                        Status = VerificationStatus.Approved
                    },
                    new User()
                    {
                        Id = -2,
                        Username = "salesman",
                        //jabuka123
                        Password = "$2a$10$UVn74F/yEiUzKWBSGVyzHe2UfpVJ95zY50Q8bz1RFyrAYVfwFAj4i",
                        Email = "johndoe@gmail.com",
                        Name = "John Doe",
                        Address = "Novi Sad",
                        Image = "",
                        Role = Role.Salesman,
                        DateOfBirth = new DateTime(2002, 06, 25),
                        Status = VerificationStatus.Processing
                    },
                    new User()
                    {
                        Id = -3,
                        Username = "customer",
                        //jabuka123
                        Password = "$2a$10$UVn74F/yEiUzKWBSGVyzHe2UfpVJ95zY50Q8bz1RFyrAYVfwFAj4i",
                        Email = "johndoe@gmail.com",
                        Name = "John Doe",
                        Address = "Novi Sad",
                        Image = "",
                        Role = Role.Customer,
                        DateOfBirth = new DateTime(1999, 06, 25),
                        Status = VerificationStatus.Approved
                    }
                );
            });

            modelBuilder.Entity<Article>(a =>
            {
                a.HasData(
                    new Article()
                    {
                        Id = -1,
                        SalesmanId = -2,
                        Name = "Glass",                
                        Price = 250,
                        Quantity = 50,
                        Description = "asdasda",
                        Image = ""
                    },
                    new Article()
                    {
                        Id = -2,
                        SalesmanId = -2,
                        Name = "Plate",
                        Price = 250,
                        Quantity = 30,
                        Description = "asdasda",
                        Image = ""
                    }
                );
            });
            modelBuilder.Entity<Order>();
            modelBuilder.Entity<ArticleForOrder>();
        }

    }
}
