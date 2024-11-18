/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eihs6ju6le1qkl6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b3pxxwln",
    "name": "workSchedule",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ylfvjlc9",
    "name": "workDays",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eihs6ju6le1qkl6")

  // remove
  collection.schema.removeField("b3pxxwln")

  // remove
  collection.schema.removeField("ylfvjlc9")

  return dao.saveCollection(collection)
})
