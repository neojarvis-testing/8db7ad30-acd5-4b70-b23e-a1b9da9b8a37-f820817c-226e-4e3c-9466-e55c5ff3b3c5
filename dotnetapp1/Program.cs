using dotnetapp1.Data;
using Microsoft.EntityFrameworkCore;
using dotnetapp1.Services;
using Microsoft.AspNetCore.Identity;
using CommonLibrary.Models;
using CommonLibrary.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString: builder.Configuration.GetConnectionString("AppCon")));
builder.Services.AddIdentityCore<ApplicationUser>(options=>options.SignIn.RequireConfirmedAccount=true).AddRoles<IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddScoped<IAuthService, AuthService>();

var key = "this_is_a_top_secret_key_for_accessing_our_application_service";

builder.Services.AddJwtAuthentication(key);

var app = builder.Build();
app.UseCors("CorsPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();
