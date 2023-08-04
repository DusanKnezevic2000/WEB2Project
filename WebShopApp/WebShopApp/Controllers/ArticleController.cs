using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebShopApp_Business;
using WebShopApp_Data.Models;

namespace WebShopApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : Controller
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        // GET: api/<ArticleController>
        [HttpGet]
        public IEnumerable<Article> GetAll()
        {
            return _articleService.GetAll();
        }

        // GET api/<ArticleController>/5
        [HttpGet("{id}")]
        public Article GetById(int id)
        {
            return _articleService.GetById(id);
        }

        // POST api/<ArticleController>
        [HttpPost]
        public Article Post([FromBody] Article value)
        {
            return _articleService.Create(value);
        }

        // PUT api/<ArticleController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Article value)
        {
        }

        // DELETE api/<ArticleController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            try
            {
                _articleService.Delete(id);
                return true;
            }
            catch {
                return false;
            }
        }
    }
}
