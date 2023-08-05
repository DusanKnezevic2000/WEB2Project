using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data.Models;

namespace WebShopApp_Business.DTO
{ 
    public class OrderResponseDTO
    {
        public int Id { get; set; }
        public UserDTO Customer { get; set; }
        public List<ArticleDTO> Articles { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }
        public OrderStatus Status { get; set; }

        public OrderResponseDTO(int id, UserDTO customer, List<ArticleDTO> articles, string startTime, string endTime, string comment, string address, double price, OrderStatus status)
        {
            Id = id;
            Customer = customer;
            Articles = articles;
            StartTime = startTime;
            EndTime = endTime;
            Comment = comment;
            Address = address;
            Price = price;
            Status = status;
        }

        public OrderResponseDTO(int id, List<ArticleDTO> articles, string startTime, string endTime, string comment, string address, double price, OrderStatus status)
        {
            Id = id;
            Articles = articles;
            StartTime = startTime;
            EndTime = endTime;
            Comment = comment;
            Address = address;
            Price = price;
            Status = status;
        }
    }
}
