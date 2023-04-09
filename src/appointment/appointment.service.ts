import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

interface ResponseData {
  ok: boolean, 
  msg: string
}

@Injectable()
export class AppointmentService {


  async create(createAppointmentDto: CreateAppointmentDto): Promise<any> {

    try {
      const { name, mobile, email, message, doubt } = createAppointmentDto;
      let textAppointment = `<h4>Nombre Cliente: ${name} \n <p>Celular: ${mobile} </p> \n <p> Correo: ${email} </p> \n <p> Mensaje de Cita: ${message} </p> </h4>`
      let textDoubt = `<h4>Correo del Cliente: ${email} \n <p>Duda: ${doubt}</p> </h4>`;

      let transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
          }
      });
      
      const mailOptions = {
          from: 'luisalonsowebsite@gmail.com', // Sender address
          to: 'lalonsomv@gmail.com', // List of recipients
          subject: (doubt) ? 'Ayuda Cliente' : 'Cita Cliente Pagina Web', // Subject line
          text: (doubt) ? 'Ayuda' : 'Cita Cliente Web', // Plain text body
          html: (doubt) ? textDoubt : textAppointment, // html body
          // html: textAppointment, // html body
      };
      
      let dataToReturn: ResponseData;
      return new Promise( (resolve, reject) => {

        transport.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log('Error: ', err);
                dataToReturn = {
                    ok: false,
                    msg: 'El correo fallo en la transportacion'
                };
                reject( dataToReturn );
            } else {
                dataToReturn = {
                    ok: true,
                    msg: 'Correo enviado y recibido exitosamente'
                };
                resolve( dataToReturn );
            };
        });
        
    })
      
    } catch (error) {
        console.log(error);
        throw new BadRequestException('Ha ocurrido un error, contacte con el Administrador');
    };

  }

}
