using HackWeekly_ToDoList.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

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
