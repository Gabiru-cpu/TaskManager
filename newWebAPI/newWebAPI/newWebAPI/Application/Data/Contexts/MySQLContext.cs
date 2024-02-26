using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using newWebAPI.Domain.Models;

namespace newWebAPI.Application.Data.Contexts
{
    public class MySQLContext : IdentityDbContext<User>
    {
        public MySQLContext(DbContextOptions<MySQLContext> options) : base(options) 
        {

        }

        public DbSet<User> User { get; set; }

        public DbSet<AssignmentList> AssignmentList { get; set; }

        public DbSet<Assignment> Assignment { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().ToTable("User").HasKey(t => t.Id);

            builder.Entity<AssignmentList>();

            builder.Entity<Assignment>();

        }

    }
}
