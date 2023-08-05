using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data;
using WebShopApp_Data.Models;

namespace WebShopApp_Business.Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IArticleRepository _articleRepository;

        public OrderService(IOrderRepository orderRepository, IArticleRepository articleRepository)
        {
            _orderRepository = orderRepository;
            _articleRepository = articleRepository;
        }

        public Order Create(Order order)
        {
            UpdateArticleAmount(order);
            return _orderRepository.Insert(order);
        }

        public IEnumerable<Order> GetAll()
        {
            return _orderRepository.GetAll();
        }

        public Order GetById(int id)
        {
            return _orderRepository.GetById(id);
        }

        public Order Update(int id, Order order)
        {
            //if (_orderRepository.GetById(id) == null) return null;
            return _orderRepository.Update(order);
        }

        private void UpdateArticleAmount(Order order) 
        {
            foreach(var orderArticle in order.Articles) 
            {
                Article article = _articleRepository.GetById(orderArticle.OriginalArticleId);
                article.Quantity -= orderArticle.Quantity;
                _articleRepository.Update(article);
            }
        }
    }
}
