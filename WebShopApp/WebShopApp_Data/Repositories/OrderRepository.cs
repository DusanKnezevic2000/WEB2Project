using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebShopApp_Data.Models;

namespace WebShopApp_Data.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        private readonly DatabaseContext _dbContext;

        public OrderRepository(DatabaseContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Order> GetAllCustomerOrders(int id)
        {
            return _dbContext.Set<Order>().Include(o => o.Articles).Where(o => o.CustomerId == id);
        }

        public IEnumerable<Order> GetAllWithArticles()
        {
            return _dbContext.Set<Order>().Include(o => o.Articles);
        }
        public Order GetByIdWithArticles(int id)
        {
            return _dbContext.Set<Order>().Include(o => o.Articles).FirstOrDefault(o => o.Id == id);
        }
    }
}
