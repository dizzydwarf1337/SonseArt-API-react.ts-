using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence.Database;
using Persistence.Identity;

public class AuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationContext _context;

    public AuthService(UserManager<User> userManager, IConfiguration configuration,ApplicationContext context)
    {
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
    }

    public async Task<string> Authenticate(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
        {
            return null;
        }
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenCheck = await _context.UserTokens.FirstOrDefaultAsync(p=>p.UserId==user.Id);
        if(tokenCheck != null)
        {
            return tokenCheck.Value;
        }
        
        var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]);
        var userRoles = await _userManager.GetRolesAsync(user);
        var tokenDescriptor = new SecurityTokenDescriptor

        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = _configuration["JwtSettings:Issuer"],
            Audience = _configuration["JwtSettings:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        foreach (var role in userRoles)
        {
            tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, role));
        }


        var token = tokenHandler.CreateToken(tokenDescriptor);
        await _context.UserTokens.AddAsync(new IdentityUserToken<Guid> { UserId = user.Id,Name="Jwt",LoginProvider="Bearer", Value = tokenHandler.WriteToken(token) });
        await _context.SaveChangesAsync();
        return tokenHandler.WriteToken(token);
    }
    public async Task Logout(EmailRequest email)
    {
        var user = await _userManager.FindByEmailAsync(email.Email);
        var token = await _context.UserTokens.FirstOrDefaultAsync(p => p.UserId == user.Id);
        if (token != null)
        {
            _context.UserTokens.Remove(token);
            await _context.SaveChangesAsync();
        }
    }
}
