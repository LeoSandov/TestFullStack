using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Inventario.ProductService.API.Data;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using EFCore.NamingConventions;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirLocalhost4200", policy =>
    {
        policy
          .WithOrigins("http://localhost:4200")
          .AllowAnyMethod()
          .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProductService API", Version = "v1" });
});

var connString = builder.Configuration.GetConnectionString("InventarioDb");
builder.Services.AddDbContext<InventoryContext>(opt =>
    opt.UseSqlServer(connString)
       .UseSnakeCaseNamingConvention()
);

builder.Services.AddControllers()
    .AddJsonOptions(opts =>
        opts.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    );

var app = builder.Build();

app.UseCors("PermitirLocalhost4200");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProductService API v1");
    });
}

var productosPhysicalPath = Path.Combine(builder.Environment.ContentRootPath, "productos");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(productosPhysicalPath),
    RequestPath  = "/productos"
});

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
