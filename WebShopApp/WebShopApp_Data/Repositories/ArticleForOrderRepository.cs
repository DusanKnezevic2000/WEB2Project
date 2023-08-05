using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
