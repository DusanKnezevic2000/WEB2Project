using System;
using System.Collections.Generic;
using System.Linq;
using WebShopApp_Data.Models;

namespace WebShopApp_Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : Entity
    {
        private readonly DatabaseContext _dbContext;

        public GenericRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Delete(T entity)
        {
            try
            {
                _dbContext.Set<T>().Remove(entity);
                Save();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<T> GetAll()
        {
            return _dbContext.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return _dbContext.Set<T>().Find(id);
        }

        public T Insert(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            Save();
            return entity;
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public T Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
            Save();
            return entity;
        }
    }
}
