/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0oonezfb",
    "name": "in",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gdiaqbmi",
    "name": "out",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  // remove
  collection.schema.removeField("0oonezfb")

  // remove
  collection.schema.removeField("gdiaqbmi")

  return dao.saveCollection(collection)
})
