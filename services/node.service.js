const dotenv = require('dotenv')
dotenv.config()

const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
  }
  });
  


async function generateHTML(email, name, phoneNo, scrum, message) {
    // Create the HTML content using template literals with inline styles
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: #fff; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); padding: 20px;">
            <p style="color: #333;">Name ${name}</p>
            <p style="color: #555;">Email: ${email}</p>
            <p style="color: #555;">Phone No: ${phoneNo}</p>
            <p style="color: #555;">Course: ${scrum}</p>
            <h3 style="color: #555;">Message: ${message}</h3>
        </div>
    </body>
    </html>
    `;

    return htmlContent;
}


async function manipulateData(body){
    try{
    const {email , name , phoneNo , course , message , nameField} = body;
    const alignHtml = await generateHTML(email , name , phoneNo , course , message);
    const sendEmail = await sendMail('kush.kaushik@heliverse.com' , nameField  , alignHtml , email , nameField )
    // console.log(sendEmail)
   return sendEmail
}catch(error){
    return {
        success : false,
        error : error.message,
    }
}
}


async function sendMail(to, subject, html , from , nameField) {
    try {
      await transporter.sendMail({
        from: `"${nameField}" <${from}>`,
        // from,
        to,
        subject,
        html,
      });
     return {
      success: true,
      msg : 'Thank you for sending the query our team will reach back you soon'
     }
    } catch (error) {
      return {
        success: false,
        error : error.message
      }
    }
  }





module.exports  = {generateHTML , manipulateData , sendMail}