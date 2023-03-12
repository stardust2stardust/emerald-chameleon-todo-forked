using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Newtonsoft.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Serialization;

namespace HackWeekly_ToDoList.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class ToDoCategory
    {
        [Key]
        public int Id { get; private set; }
        public string Name { get; set; }
    }

    public class ToDoListItem
    {
        [Key]
        public int Id { get; private set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; }
        public bool IsDone { get; set; }
        [ForeignKey(nameof(ToDoCategory.Id))]
        public virtual int CategoryId { get; set; }
    }

    public class Priority
    {
        [Key] 
        public int PId { get; set; }
        public string Description { get; set; }
    }

    public class ToDoList
    {
        public virtual ToDoCategory Category { get; set; }
        public virtual List<ToDoListItem> ToDoListItems { get; set; }
    }

    public class ToDoListResponse
    {
        public virtual List<ToDoList> TodoList { get; set; }
    }
}
