using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebShopApp_Data.Models
{
    public class Order : Entity
    {
        public int CustomerId { get; set; }
        public List<ArticleForOrder> Articles { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }
        public OrderStatus Status { get; set; }

        public Order()
        {

        }

        public Order(int customerId, List<ArticleForOrder> articles, DateTime startTime, DateTime endTime, string comment, string address, double price, OrderStatus status)
        {
            CustomerId = customerId;
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
