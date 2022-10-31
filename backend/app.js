// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
//require('dotenv').config();
import dotenv from 'dotenv';
import mongoDb from './mongoDb.js'
import employees from './models/test.js';
import express from 'express'
import bodyParser from 'body-parser';
import { RegisterStatusResponse, Url } from './utils/constant.js';
import { isPhoneNumber } from './utils/common.js';

import {
   checkUser,
   loginWithPhoneOtp,
   confirmCreateUser,
   verifyToken,
} from "./controllers/auth.controller.js";
import { verifyJwtToken } from './utils/token.util.js';



dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
   res.send('Hello World!')
})

//app.post('/auth/register', (req, res) => {
//   console.log(req.body);
//   // Check phone number
//   console.log(req.body.phoneNumber, 'req.body.phoneNumber')
//   if (!isPhoneNumber(req.body.phoneNumber)) {
//      res.status(400).send(RegisterStatusResponse.INVALID_PHONE_NUMBER);
//      console.log('RegisterStatusResponse.INVALID_PHONE_NUMBER')
//      return;
//   }
//
//   //client.verify.v2.services('VA4a2fca4291a16523cde9b95e957f80c9')
//   //   .verifications
//   //   .create({ to: `+84${req.body.phoneNumber.substring(1)}`, channel: 'sms' })
//   //   .then(verification => console.log(verification))
//   //   .catch(err => console.log(err));
//
//   res.json({ status: RegisterStatusResponse.SUCCESSFUL })
//})

app.post(Url.REGISTER, checkUser);
app.post(Url.CONFIRM_REGISTER, confirmCreateUser);
app.post(Url.LOGIN_TOKEN, verifyToken);

//app.use("/api/auth", authRoutes);

app.listen(8080)

var data = [
   {
      name: "John",
      age: 21,
      location: "New York",
      status: '1'
   },
   {
      name: "Smith",
      age: 27,
      location: "Texas"
   },
   {
      name: "Lisa",
      age: 23,
      location: "Chicago"
   }
];
employees.insertMany(data);


/**
 
 */