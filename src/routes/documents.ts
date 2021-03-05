/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as http from 'http'

import { DocumentsModel } from '../models/documents';

const documentsModel = new DocumentsModel();

const router = (fastify, { }, next) => {

  var db: Knex = fastify.db;

  fastify.get('/info', async (req: fastify.Request, reply: fastify.Reply) => {
    try {
      var rs = await documentsModel.info(db);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });

  fastify.get('/selectGroupID', async (req: fastify.Request, reply: fastify.Reply) => {
    const groupID = req.query.groupID;
    try {
      var rs = await documentsModel.selectGroupID(db,groupID);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });
  
  fastify.post('/insert', async (req: fastify.Request, reply: fastify.Reply) => {

    const info = req.body;

    try {
      var rs = await documentsModel.save(db,info);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });

  fastify.put('/update', async (req: fastify.Request, reply: fastify.Reply) => {
    const documentsID = req.query.documentsID;
    const info = req.body;
    try {
      var rs = await documentsModel.update(db,documentsID,info);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });
  next();

}

module.exports = router;