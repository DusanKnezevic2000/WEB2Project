using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data.Models;

namespace WebShopApp_Business
{
    public interface IArticleForOrderService
    {
        public ArticleForOrder GetById(int id);
        public IEnumerable<ArticleForOrder> GetAll();
        public ArticleForOrder Create(ArticleForOrder article);
        public void Delete(int id);
    }
}
