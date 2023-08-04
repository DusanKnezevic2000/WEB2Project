using System.Linq;
using WebShopApp_Data.Models;

namespace WebShopApp_Data.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly DatabaseContext _dbContext;

        public UserRepository(DatabaseContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public User GetByUsername(string username)
        {
            return _dbContext.Set<User>().FirstOrDefault(u => u.Username == username);
        }
    }
}
