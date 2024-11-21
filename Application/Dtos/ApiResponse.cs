using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class ApiResponse<T>
    {
        public bool IsSuccess { get; set; } 
        public T Data { get; set; }
        public string Message { get; set; }
        public static ApiResponse<T> Success (T data) => new ApiResponse<T> { IsSuccess = true, Data = data };
        public static ApiResponse<T> Failure(string error) => new ApiResponse<T> { IsSuccess=false,Message=error};
    }
}
