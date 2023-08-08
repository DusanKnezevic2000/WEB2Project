using Humanizer.Configuration;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace WebShopApp_Business.Service
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public void SendApproveEmail(string userEmail) 
        {
            string senderEmail = _config.GetConnectionString("EmailAddress");
            string senderPassword = _config.GetConnectionString("EmailPassword");

            MailMessage message = new MailMessage();
            message.From = new MailAddress(senderEmail);
            message.Subject = "Account approved";
            message.To.Add(new MailAddress(userEmail));
            message.Body = "We are happy to inform you that your account has been approved. Enjoy using our services!";

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
        }

        public void SendRejectEmail(string userEmail)
        {
            string senderEmail = _config.GetConnectionString("EmailAddress");
            string senderPassword = _config.GetConnectionString("EmailPassword");

            MailMessage message = new MailMessage();
            message.From = new MailAddress(senderEmail);
            message.Subject = "Account rejected";
            message.To.Add(new MailAddress(userEmail));
            message.Body = "We are sorry to inform you that your account has been rejected.";

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
        }
    }
}
