using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebShopApp_Data.Models
{
    public class Entity
    {
        public int Id { get; set; }
        public Entity()
        {

        }
        public Entity(int id)
        {
            Id = id;
        }
    }
}
