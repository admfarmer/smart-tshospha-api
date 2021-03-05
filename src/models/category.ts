import * as Knex from 'knex';

export class CategoryModel {
  tableName: string = 'tshosp_ha_category';

  info(db: Knex) {
    return db(this.tableName)
  }
}