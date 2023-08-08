using FluentResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading;
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
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(DTOMapper.List_Article_to_ArticleDTO(_articleService.GetAll().Where(a => a.SalesmanId == id).ToList()));
            }
            catch
            {
                return BadRequest("Something went wrong.");
            }
        }

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
                return BadRequest("Something went wrong");

            }
        }

        // PUT api/<ArticleController>/5
        [HttpPut]
        public IActionResult Put([FromBody] ArticleDTO value)
        {
            try
            {
                Article article = _articleService.GetById(value.Id);
                //Thread.Sleep(5000);
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
            catch (DbUpdateConcurrencyException) 
            {
                return Conflict("Article is being accessed by a customer. Please, try again in a few moments.");
            }
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
