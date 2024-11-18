/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  // remove
  collection.schema.removeField("daijezqs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezzvlf8s",
    "name": "timestamp",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "daijezqs",
    "name": "timestamp",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("ezzvlf8s")

  return dao.saveCollection(collection)
})
