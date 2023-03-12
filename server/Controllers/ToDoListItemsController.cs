using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HackWeekly_ToDoList.Data;
using HackWeekly_ToDoList.Models;

namespace HackWeekly_ToDoList.Controllers
{
    [Tags("ToDoItem")]
    [Route("api/item")]
    [ApiController]
    public class ToDoListItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToDoListItemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ToDoListItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoListItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/ToDoListItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoListItem>> GetToDoListItem(int id)
        {
            var toDoListItem = await _context.TodoItems.FindAsync(id);

            if (toDoListItem == null)
            {
                return NotFound();
            }

            return toDoListItem;
        }

        // PUT: api/ToDoListItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoListItem(int id, ToDoListItem toDoListItem)
        {
            var toDoListItem1 = _context.TodoItems.Where(x => x.Id == id).FirstOrDefault();
            toDoListItem1.DueDate = toDoListItem.DueDate;
            toDoListItem1.IsDone = toDoListItem.IsDone;
            toDoListItem1.CategoryId = toDoListItem.CategoryId;
            toDoListItem1.Description = toDoListItem.Description;
            toDoListItem1.Priority = toDoListItem.Priority;
            if (id != toDoListItem1.Id)
            {
                return BadRequest();
            }

            _context.Entry(toDoListItem1).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoListItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ToDoListItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ToDoListItem>> PostToDoListItem(ToDoListItem toDoListItem)
        {
            _context.TodoItems.Add(toDoListItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetToDoListItem), new { id = toDoListItem.Id }, toDoListItem);
        }

        // DELETE: api/ToDoListItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoListItem(int id)
        {
            var toDoListItem = await _context.TodoItems.FindAsync(id);
            if (toDoListItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(toDoListItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoListItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
