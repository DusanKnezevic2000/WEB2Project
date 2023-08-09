
namespace WebShopApp_Business.DTO
{
    public class ArticleDTO
    {
        public int Id { get; set; }
        public int SalesmanId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public ArticleDTO(int id, int salesmanId, string name, double price, int quantity, string description, string image)
        {
            Id = id;
            SalesmanId = salesmanId;    
            Name = name;
            Price = price;
            Quantity = quantity;
            Description = description;
            Image = image;
        }
    }
}
