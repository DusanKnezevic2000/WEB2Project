using System.Collections.Generic;
using WebShopApp_Data.Models;

namespace WebShopApp_Data
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        IEnumerable<Order> GetAllCustomerOrders(int id);
        IEnumerable<Order> GetAllWithArticles();
        Order GetByIdWithArticles(int id);


    }
}
