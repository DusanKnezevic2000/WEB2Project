using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebShopApp_Data.Models
{
    public class Article : Entity
    {
        public int SalesmanId { get; set; }  
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public Article()
        {

        }

        public Article(int salesmanId, string name, double price, int quantity, string description, string image){
            SalesmanId = salesmanId;
            Name = name;
            Price = price;
            Quantity = quantity;
            Description = description;
            Image = image;
        }
    }
}
