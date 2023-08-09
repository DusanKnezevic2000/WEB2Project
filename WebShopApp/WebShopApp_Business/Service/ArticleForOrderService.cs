using AutoMapper;
using System.Collections.Generic;
using WebShopApp_Data.Models;
using WebShopApp_Data;

namespace WebShopApp_Business.Service
{
    public class ArticleForOrderService : IArticleForOrderService
    {
        private readonly IArticleForOrderRepository _articleRepository;
        private readonly IMapper _mapper;

        public ArticleForOrderService(IArticleForOrderRepository articleRepository, IMapper mapper)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
        }

        public ArticleForOrder Create(ArticleForOrder article)
        {
            return _articleRepository.Insert(article);
        }

        public IEnumerable<ArticleForOrder> GetAll()
        {
            return _articleRepository.GetAll();
        }

        public ArticleForOrder GetById(int id)
        {
            return _articleRepository.GetById(id);
        }

        public void Delete(int id)
        {
            _articleRepository.Delete(GetById(id));
        }
    }
}
