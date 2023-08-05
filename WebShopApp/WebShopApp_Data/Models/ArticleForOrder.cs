using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebShopApp_Data.Models
{
    public class ArticleForOrder : Entity
    {
        public int SalesmanId { get; set; }
        public int OriginalArticleId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public ArticleForOrder()
        {
        }

        public ArticleForOrder(int salesmanId, int originalArticleId, string name, double price, int quantity, string description, string image)
        {
            SalesmanId = salesmanId;
            OriginalArticleId = originalArticleId;
            Name = name;
            Price = price;
            Quantity = quantity;
            Description = description;
            Image = image;
        }
    }
}
