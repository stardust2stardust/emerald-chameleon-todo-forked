using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HackWeekly_ToDoList.Migrations
{
    /// <inheritdoc />
    public partial class fixitemforeignkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_Category_CategoryId",
                table: "TodoItems");

            migrationBuilder.DropIndex(
                name: "IX_TodoItems_CategoryId",
                table: "TodoItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_CategoryId",
                table: "TodoItems",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_Category_CategoryId",
                table: "TodoItems",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
