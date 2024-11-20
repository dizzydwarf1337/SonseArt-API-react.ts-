using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Identity
{
    public class User : IdentityUser<Guid>
    {
        public string City { get; set; }
        public string Street { get; set;}
        public string ZipCode { get; set;}
        public string House { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid CartId { get; set; }
        public virtual Cart Cart { get; set; }
        public List<Comment> comments { get; set; }
    }
}
