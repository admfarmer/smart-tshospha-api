import * as Knex from 'knex';

export class GroupModel {
  tableName: string = 'tshosp_ha_group';

  info(db: Knex) {
    return db(this.tableName)
  }

  selectCategoryId(db: Knex,category_id:any) {
    return db(this.tableName).where('category_id',category_id);
  }
}