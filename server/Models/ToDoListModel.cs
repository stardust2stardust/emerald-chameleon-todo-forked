using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HackWeekly_ToDoList.Models
{
    public class ToDoCategory
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ToDoListItem
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; }
        public bool IsDone { get; set; }
        public virtual ToDoCategory Category { get; set; }
    }

    public class ToDoList
    {
        public virtual ToDoCategory Category { get; set; }
        public virtual List<ToDoListItem> ToDoListItems { get; set; }
    }

    public class ToDoListResponse
    {
        public List<ToDoList> TodoList { get; set; }
    }
}
