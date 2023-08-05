using FluentResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebShopApp_Business;
using WebShopApp_Business.DTO;
using WebShopApp_Business.Service;
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
        public IActionResult Post([FromBody] ArticleDTO value)
        {
            try
            {
                Article res = _articleService.Create(DTOMapper.ArticleDTO_to_Article(value));
                return Ok(DTOMapper.Article_To_ArticleDTO(res));
            }
            catch
            {
                return BadRequest();

            }
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
