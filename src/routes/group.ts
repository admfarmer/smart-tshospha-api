/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as http from 'http'

import { GroupModel } from '../models/group';

const groupModel = new GroupModel();

const router = (fastify, { }, next) => {

  var db: Knex = fastify.db;

  fastify.get('/info', async (req: fastify.Request, reply: fastify.Reply) => {
    try {
      var rs = await groupModel.info(db);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });

  fastify.get('/selectCategoryId', async (req: fastify.Request, reply: fastify.Reply) => {
    const categoryID = req.query.categoryID;
    try {
      var rs = await groupModel.selectCategoryId(db,categoryID);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });
  next();

}

module.exports = router;