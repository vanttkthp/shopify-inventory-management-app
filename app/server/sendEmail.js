const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, products) => {
  if (!email || !products || products.length === 0) {
    throw new Error("Invalid request");
  }

  const productList = products
    .map((product) => `${product.title} (ID: ${product.id})`)
    .join("<br>");

  const mailOptions = {
    from: process.env.EMAIL_USER, // Replace with your sender email
    to: email,
    subject: "Products with zero inventory",
    html: `<p>The following products have zero inventory:</p><p>${productList}</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
