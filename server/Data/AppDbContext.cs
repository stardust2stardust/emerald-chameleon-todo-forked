using HackWeekly_ToDoList.Models;
using Microsoft.EntityFrameworkCore;

namespace HackWeekly_ToDoList.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<ToDoCategory> Category { get; set; }
        public DbSet<ToDoListItem> TodoItems { get; set; }

    }
}
