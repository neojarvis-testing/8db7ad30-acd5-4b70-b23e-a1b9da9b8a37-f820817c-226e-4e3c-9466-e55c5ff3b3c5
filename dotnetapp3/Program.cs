using CommonLibrary.Extensions;
using dotnetapp1.Data;
using dotnetapp3.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString: builder.Configuration.GetConnectionString("AppCon")));
builder.Services.AddScoped<IConferenceEventService, ConferenceEventService>();

var key = "this_is_a_top_secret_key_for_accessing_our_application_service";

builder.Services.AddJwtAuthentication(key);

var app = builder.Build();

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
