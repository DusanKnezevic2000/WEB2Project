
using System.Collections.Generic;

namespace WebShopApp_Business.DTO
{
    public class OrderDTO
    {
        public int CustomerId { get; set; }
        public List<ArticleDTO> Articles { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }

        public OrderDTO(int customerId, List<ArticleDTO> articles, string comment, string address, double price)
        {
            CustomerId = customerId;
            Articles = articles;
            Comment = comment;
            Address = address;
            Price = price;
        }
    }
}
