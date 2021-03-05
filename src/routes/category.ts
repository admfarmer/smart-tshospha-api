/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as http from 'http'

import { CategoryModel } from '../models/category';

const categoryModel = new CategoryModel();

const router = (fastify, { }, next) => {

  var db: Knex = fastify.db;


  fastify.get('/info', async (req: fastify.Request, reply: fastify.Reply) => {
    try {
      var rs = await categoryModel.info(db);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });

  next();

}

module.exports = router;