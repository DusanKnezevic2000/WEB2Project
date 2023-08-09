using AutoMapper;
using System.Collections.Generic;
using WebShopApp_Data;
using WebShopApp_Data.Models;

namespace WebShopApp_Business.Service
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;

        public ArticleService(IArticleRepository articleRepository, IMapper mapper)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
        }

        public Article Create(Article article)
        {
            return _articleRepository.Insert(article);
        }

        public Article Update(Article article)
        {
            return _articleRepository.Update(article);
        }

        public IEnumerable<Article> GetAll()
        {
            return _articleRepository.GetAll();
        }

        public Article GetById(int id)
        {
            return _articleRepository.GetById(id);
        }

        public void Delete(int id)
        {
            Article a = GetById(id);
            _articleRepository.Delete(a);
        }
    }
}
