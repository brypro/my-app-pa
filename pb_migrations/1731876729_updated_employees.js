/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eihs6ju6le1qkl6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s6eodux6",
    "name": "department",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("eihs6ju6le1qkl6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s6eodux6",
    "name": "departament",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
