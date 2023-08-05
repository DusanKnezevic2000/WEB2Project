using FluentResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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
        public List<ArticleDTO> GetAll()
        {
            return DTOMapper.List_Article_to_ArticleDTO(_articleService.GetAll().ToList());
        }

        // GET api/<ArticleController>/5
        [HttpGet("{id}")]
        public ArticleDTO GetById(int id)
        {
            return DTOMapper.Article_To_ArticleDTO(_articleService.GetById(id));
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
        [HttpPut]
        public IActionResult Put([FromBody] ArticleDTO value)
        {
            Article article = _articleService.GetById(value.Id);
            
            if (article != null)
            {
                article.Quantity = value.Quantity;
                article.Price = value.Price;
                article.Name = value.Name;
                article.Description = value.Description;
                article.Image = value.Image;
                _articleService.Update(article);
                return Ok(DTOMapper.Article_To_ArticleDTO(article));
            }
            return BadRequest("Article not found");
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
