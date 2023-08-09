using System.Collections.Generic;

namespace WebShopApp_Data
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        T Insert(T entity);
        T Update(T entity);
        void Delete(T entity);
        void Save();
    }
}
