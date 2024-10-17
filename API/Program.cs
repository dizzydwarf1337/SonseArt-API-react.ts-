using Domain.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationContext>
    (opt => opt.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Database=SonseArt2;Integrated Security=True;TrustServerCertificate=True;"));
builder.Services.AddScoped<IProductRepository, ProductRepo>();
builder.Services.AddScoped<ICommentRepository, CommentRepo>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Application.Products.Create.Command).Assembly));
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors("CorsPolicy");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationContext>();
    context.Database.Migrate();

   Seed.SeedData(context);
}
app.Run();

