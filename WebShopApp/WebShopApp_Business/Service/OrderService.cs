using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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
            order.Price += 20;
            return _orderRepository.Insert(order);
        }

        public void Delete(int id)
        {
            Order o = _orderRepository.GetByIdWithArticles(id);
            foreach (ArticleForOrder article in o.Articles)
            {
                Article a = _articleRepository.GetById(article.OriginalArticleId);
                if (a != null)
                {
                    a.Quantity += article.Quantity;
                    _articleRepository.Update(a);
                }
            }
            o.Status = OrderStatus.Cancelled;
            _orderRepository.Update(o);
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
            foreach (var orderArticle in order.Articles)
            {
                Article article = _articleRepository.GetById(orderArticle.OriginalArticleId);
                if (article != null)
                {
                    article.Quantity -= orderArticle.Quantity;
                    if (article.Quantity < 0)
                        throw new Exception();
                    _articleRepository.Update(article);
                }
                else
                {
                    throw new Exception();
                } 
            }
        }

        public IEnumerable<Order> GetAllCustomerOrders(int id)
        {
            return _orderRepository.GetAllCustomerOrders(id);
        }

        public IEnumerable<Order> GetAllWithArticles()
        {
            return _orderRepository.GetAllWithArticles();
        }

    }
}
