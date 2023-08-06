using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IArticleForOrderService _articleForOrderService;
        private readonly IUserService _userService;

        public OrderController(IOrderService orderService, IArticleForOrderService articleForOrderService, IUserService userService)
        {
            _orderService = orderService;
            _articleForOrderService = articleForOrderService;
            _userService = userService;
        }

        // GET: api/<OrderController>
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                List<OrderResponseDTO> ordersDto = new List<OrderResponseDTO>();
                List<Order> orders = _orderService.GetAllWithArticles().ToList();
                foreach (Order order in orders)
                {
                    OrderResponseDTO current = DTOMapper.Order_To_OrderResponseDTO(order);
                    current.Customer = DTOMapper.User_To_UserDTO_Safe(_userService.GetUser(order.CustomerId));
                    ordersDto.Add(current);
                }
                return Ok(ordersDto);
            }
            catch 
            {
                return BadRequest("Something went wrong.");
            }
        }

        // GET: api/<OrderController>
        [HttpGet("[action]/{id}")]
        public IActionResult Customer(int id)
        {
            try
            {
                List<OrderResponseDTO> ordersDto = new List<OrderResponseDTO>();
                List<Order> orders = _orderService.GetAllCustomerOrders(id).ToList();
                foreach (Order order in orders)
                {
                    if (order.EndTime < DateTime.Now && order.Status != OrderStatus.Cancelled)
                    {
                        OrderResponseDTO current = DTOMapper.Order_To_OrderResponseDTO(order);
                        current.Customer = DTOMapper.User_To_UserDTO_Safe(_userService.GetUser(order.CustomerId));
                        ordersDto.Add(current);
                    }
                }
                return Ok(ordersDto);
            }
            catch
            {
                return BadRequest("Something went wrong.");
            }
        }

        [HttpGet("[action]/{id}")]
        public IActionResult Salesman(int id)
        {
            try
            {
                List<OrderResponseDTO> ordersDto = new List<OrderResponseDTO>();
                List<Order> orders = _orderService.GetAllWithArticles().ToList();
                foreach (Order order in orders)
                {
                    if (order.EndTime < DateTime.Now && order.Status != OrderStatus.Cancelled)
                    {
                        foreach (ArticleForOrder article in order.Articles)
                        {
                            if (article.SalesmanId == id)
                            {
                                OrderResponseDTO current = DTOMapper.Order_To_OrderResponseDTO(order);
                                current.Customer = DTOMapper.User_To_UserDTO_Safe(_userService.GetUser(order.CustomerId));
                                ordersDto.Add(current);
                                break;
                            }
                        }
                    }
                }
                return Ok(ordersDto);
            }
            catch
            {
                return BadRequest("Something went wrong.");
            }
        }

        [HttpGet("customerNew/{id}")]
        public IActionResult CustomerNew(int id)
        {
            try
            {
                List<OrderResponseDTO> ordersDto = new List<OrderResponseDTO>();
                List<Order> orders = _orderService.GetAllCustomerOrders(id).ToList();
                foreach (Order order in orders)
                {
                    if (order.EndTime > DateTime.Now && order.StartTime < DateTime.Now && order.Status != OrderStatus.Cancelled)
                    {
                        OrderResponseDTO current = DTOMapper.Order_To_OrderResponseDTO(order);
                        current.Customer = DTOMapper.User_To_UserDTO_Safe(_userService.GetUser(order.CustomerId));
                        ordersDto.Add(current);
                    }
                }
                return Ok(ordersDto);
            }
            catch
            {
                return BadRequest("Something went wrong.");
            }
        }

        [HttpGet("salesmanNew/{id}")]
        public IActionResult Salesmannew(int id)
        {
            try
            {
                List<OrderResponseDTO> ordersDto = new List<OrderResponseDTO>();
                List<Order> orders = _orderService.GetAllWithArticles().ToList();
                foreach (Order order in orders)
                {
                    if (order.EndTime < DateTime.Now && order.StartTime > DateTime.Now && order.Status != OrderStatus.Cancelled)
                    {
                        foreach (ArticleForOrder article in order.Articles)
                        {
                            if (article.SalesmanId == id)
                            {
                                OrderResponseDTO current = DTOMapper.Order_To_OrderResponseDTO(order);
                                current.Customer = DTOMapper.User_To_UserDTO_Safe(_userService.GetUser(order.CustomerId));
                                ordersDto.Add(current);
                                break;
                            }
                        }
                    }
                }
                return Ok(ordersDto);
            }
            catch
            {
                return BadRequest("Something went wrong.");
            }
        }

        // POST api/<OrderController>
        [HttpPost]
        public IActionResult Post(OrderDTO order)
        {
            try {
                _orderService.Create(DTOMapper.OrderDTO_To_Order(order));
                return Ok("Order created successfully");
            }
            catch {
                return BadRequest("Order not created");
            }
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public Order Put(int id, [FromBody] Order value)
        {
            return _orderService.Update(id, value);
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _orderService.Delete(id);
                return Ok(true);
            }
            catch
            {
                return BadRequest(false);
            }
        }
    }
}
