import * as Knex from 'knex';

export class UsersModel {
  tableName: string = 'tshosp_ha_users';

  info(db: Knex) {
    return db(this.tableName)
  }  
  
  selectID(db: Knex, userId: any) {
    return db(this.tableName)      
    .where('user_id', userId);
  }

  login(db: Knex, username: string, password: string) {
    return db(this.tableName)
      .select('fullname', 'user_id', 'user_type',)
      .where({
        username: username,
        password: password,
        is_active: 'Y'
      });
  }

  save(db: Knex, info: any) {
    return db(this.tableName).insert(info);
  }

  update(db: Knex, userId: any, info: any) {
    return db(this.tableName)
      .where('user_id', userId)
      .update(info);
  }

  remove(db: Knex, userId: any) {
    return db(this.tableName)
      .where('user_id', userId)
      .del();
  }
}