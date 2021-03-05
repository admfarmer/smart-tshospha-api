/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { UsersModel } from '../models/users';

const usersModel = new UsersModel();

const router = (fastify, { }, next) => {

  var db: Knex = fastify.db;

  fastify.get('/info', async (req: fastify.Request, reply: fastify.Reply) => {
    try {
      var rs = await usersModel.info(db);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });

  fastify.get('/selectId', async (req: fastify.Request, reply: fastify.Reply) => {
    const userId = req.query.userId

    try {
      var rs = await usersModel.selectID(db,userId);
      reply.code(200).send({ ok: true, rows: rs });
    } catch (error) {
      req.log.error(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });

  fastify.post('/insert', { preHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const username = req.body.username;
    const fullname = req.body.fullname;
    const isActive = req.body.isActive;
    const userType = req.body.userType;

    const password = req.body.password;
    const encPassword = crypto.createHash('md5').update(password).digest('hex');

    const data: any = {
      username: username,
      password: encPassword,
      fullname: fullname,
      is_active: isActive,
      user_type: userType,
    };

    try {
      await usersModel.save(db, data);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.put('/update', { preHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userId = req.query.userId;
    const fullname = req.body.fullname;
    const isActive = req.body.isActive;
    const password = req.body.password;
    const userType = req.body.userType;

    const info: any = {
      fullname: fullname,
      is_active: isActive,
      user_type: userType
    };

    if (password) {
      var encPass = crypto.createHash('md5').update(password).digest('hex');
      info.password = encPass;
    }

    try {
      await usersModel.update(db, userId, info);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.delete('/remove', { preHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userId: any = req.query.userId;

    try {
      await usersModel.remove(db, userId);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  next();

}

module.exports = router;