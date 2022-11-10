import { https } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import * as nodemailer from 'nodemailer';
import * as moment from 'moment';

initializeApp();

/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'transparencia.upeu@gmail.com',
    pass: 'ciqwlxgpjunqwbkj',
  },
});

export const notifyInterestedParties = https.onCall(
  (data: any, context: any) => {
    // getting dest email by query string
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
  }
);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
