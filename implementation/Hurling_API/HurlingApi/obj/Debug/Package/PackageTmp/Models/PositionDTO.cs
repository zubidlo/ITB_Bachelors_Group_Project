using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HurlingApi.Models
{
    /// <summary></summary>
    public class PositionDTO
    {
        /// <summary></summary>
        [Key]    
        public int Id { get; set; }

        /// <summary></summary>
        [Required]
        public string Name { get; set; }
    }
}