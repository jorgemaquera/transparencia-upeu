import * as nodemailer from 'nodemailer';
import * as moment from 'moment';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'transparencia.upeu@gmail.com',
    pass: 'ciqwlxgpjunqwbkj',
  },
});

export const sendMail = (data: any, context: any) => {
  const { to, name, creationDate } = data;

  const mailOptions = {
    from: 'Transparencia UPeU <transparencia.upeu@gmail.com',
    to,
    subject: `Nuevo documento - ${name}`, // email subject
    html: `<p>Se ha subido un nuevo documento a
          <a href="https://transparencia-upeu.web.app">Transparencia UPEU</a> con nombre <b>${name}</b>, el ${moment(
      creationDate
    ).format('DD/MM/YYYY a las HH:mm')}</p>`,
  };

  // returning result
  return transporter.sendMail(mailOptions, (e: any, info: any) => {
    if (e) {
      return e.toString();
    }
    return 'Sended';
  });
};
