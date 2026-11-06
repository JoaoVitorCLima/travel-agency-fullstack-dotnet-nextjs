
using Agencia_Api_OFC.Models;
using Microsoft.EntityFrameworkCore;

namespace Agencia_Api_OFC.Context
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        { }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Produto> Produtos { get; set; }

    }
}
