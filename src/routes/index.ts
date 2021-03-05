/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as http from 'http'

const router = (fastify, { }, next) => {
  // var db: Knex = fastify.db;
  fastify.get('/', async (req: fastify.Request, reply: fastify.Reply) => {
    reply.code(200).send({ message: 'Fastify, RESTful API Smart HA Tansum!' })
  });

  next();

}

module.exports = router;