const nodemailer = require("nodemailer");
const Verifyemail = async (email, Id, Name) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "smawari1000@gmail.com",
                pass: 'ukeivcvndhomfclr'
            }
        });
        const mailOption = {
            from: "smawari1000@gmail.com",
            to: email,
            subject: "For verification of Email",
            html: `<p>hi ${Name}, please click on <a href="http://localhost:8888/api/auth/verify?userId=${Id}">verify</a></p>`
        }
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(info.response);
            }
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports = Verifyemail;