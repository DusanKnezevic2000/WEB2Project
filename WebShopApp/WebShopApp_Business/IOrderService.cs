using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data.Models;

namespace WebShopApp_Business
{
    public interface IOrderService
    {
        public Order GetById(int id);
        public IEnumerable<Order> GetAll();
        public IEnumerable<Order> GetAllCustomerOrders(int id);
        public IEnumerable<Order> GetAllWithArticles();
        public Order Create(Order order);
        public Order Update(int id, Order order);
    }
}
