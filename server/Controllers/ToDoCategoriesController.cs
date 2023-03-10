using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HackWeekly_ToDoList.Data;
using HackWeekly_ToDoList.Models;
using NuGet.Protocol;

namespace HackWeekly_ToDoList.Controllers
{
    [Tags("Category")]
    [Route("api/category")]
    [ApiController]
    public class ToDoCategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToDoCategoriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ToDoCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoCategory>>> GetCategory()
        {
            return await _context.Category.ToListAsync();
        }

        // GET: api/ToDoCategories/4
        [Tags("CategoryToDoItems")]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetCategoryItems(int id)
        {
            
            var groupedToDoListItems = _context.TodoItems.Where(i => i.CategoryId == id)
                                .Join(_context.Category,
                                    i => i.CategoryId,
                                    c => c.Id,
                                    (i, c) => new ToDoList { Category = c, ToDoListItems = new List<ToDoListItem> { i } })
                                .ToList();
            var response = new ToDoListResponse { TodoList = groupedToDoListItems };

            return Ok( response );
        }

        // PUT: api/ToDoCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<ToDoCategory>> PutToDoCategory(int id, string name)
        {
            //var toDoCategory = new ToDoCategory();
            var toDoCategory = _context.Category.Where(x => x.Id == id).FirstOrDefault();
            toDoCategory.Name = name;
            if (id != toDoCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(toDoCategory).State = EntityState.Modified;

            try
            {

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoCategoryExists(id))
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

        // POST: api/ToDoCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ToDoCategory>> PostToDoCategory(string name)
        {
            
            if (name != null)
            {
                ToDoCategory toDoCategory = new() { Name = name };
                _context.Category.Add(toDoCategory);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCategory), new { id = toDoCategory.Id }, toDoCategory);

            }

            return BadRequest();
        }

        // DELETE: api/ToDoCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoCategory(int id)
        {
            var toDoCategory = await _context.Category.FindAsync(id);
            if (toDoCategory == null)
            {
                return NotFound();
            }

            _context.Category.Remove(toDoCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoCategoryExists(int id)
        {
            return _context.Category.Any(e => e.Id == id);
        }
    }
}
