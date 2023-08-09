
using WebShopApp_Data.Models;

namespace WebShopApp_Data.Repositories
{
    public class ArticleForOrderRepository : GenericRepository<ArticleForOrder>, IArticleForOrderRepository
    {
        private readonly DatabaseContext _dbContext;

        public ArticleForOrderRepository(DatabaseContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
