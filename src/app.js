/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// // [START gae_node_request_example]
// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//   res.status(200).send('Hello, world2!').end();
// });

// // Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
//   console.log('Press Ctrl+C to quit.');
// });
// // [END gae_node_request_example]

import methodOverride from 'method-override';
import express from 'express';
import cors from 'cors';
import kitties from './routes/kitties';
import contracts from './routes/contracts';
import users from './routes/users';
import kpis from './routes/kpis';
import listener from './listener';


// Set up the express app
const app = express()
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/kitties', kitties);
app.use('/api/contracts', contracts);
app.use('/api/users', users);
app.use('/kpis', kpis);

app.use(methodOverride())
app.use((err, req, res, next) => {
    console.log("error: ", err.message );
    res.status(400).json({
        error: err.message });
});

const server = app.listen(process.env.PORT || 8080, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});


listener.watchContract().then(function(){
  console.log('Listening KittyCore Events')
})
