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
    }
}
