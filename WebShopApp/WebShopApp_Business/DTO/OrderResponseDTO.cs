using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public OrderResponseDTO(int id, UserDTO customer, List<ArticleDTO> articles, string startTime, string endTime, string comment, string address, double price)
        {
            Id = id;
            Customer = customer;
            StartTime = startTime;
            EndTime = endTime;
            Comment = comment;
            Address = address;
            Price = price;
        }
    }
}
