using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Identity
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public string House { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Role { get; set; }
        public string? Password { get; set; }
        public Guid CartId { get; set; }
        public UserDto(){}
        public UserDto(User user)
        {
            Id= user.Id;
            Email = user.Email;
            City = user.City;
            Street = user.Street;
            ZipCode = user.ZipCode;
            House = user.House;
            FirstName = user.FirstName;
            LastName = user.LastName;
            CartId = user.CartId;
        }
    }
}
