using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopApp_Data.Models;

namespace WebShopApp_Data
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
    }
}
