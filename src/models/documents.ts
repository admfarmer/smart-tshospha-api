import * as Knex from 'knex';

export class DocumentsModel {
  tableName: string = 'tshosp_ha_documents';

  info(db: Knex) {
    return db(this.tableName)
  }

  selectGroupID(db: Knex,groupID:any){
    return db('tshosp_ha_documents').select('tshosp_ha_documents.*','documents.document_id','documents.file_name')
    .leftJoin('documents','documents.document_code','tshosp_ha_documents.documents_id')
    .where('tshosp_ha_documents.group_id', groupID)
  }

  save(db: Knex, info: any) {
    return db(this.tableName).insert(info);
  }

  update(db: Knex, documentsId: any, info: any) {
    return db(this.tableName)
      .where('documents_id', documentsId)
      .update(info);
  }

  remove(db: Knex, documentsId: any) {
    return db(this.tableName)
      .where('documents_id', documentsId)
      .del();
  }
}