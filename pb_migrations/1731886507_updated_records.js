/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgzskewr",
    "name": "empleadoId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "eihs6ju6le1qkl6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sgzskewr",
    "name": "empleadoId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "eihs6ju6le1qkl6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
