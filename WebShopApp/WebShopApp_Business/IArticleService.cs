using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data.Models;

namespace WebShopApp_Business
{
    public interface IArticleService
    {
        public Article GetById(int id);
        public IEnumerable<Article> GetAll();
        public Article Create(Article article);
        public Article Update(Article article);
        public void Delete(int id);
    }
}
