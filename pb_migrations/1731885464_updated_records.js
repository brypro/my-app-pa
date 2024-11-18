/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_C8PhnFh` ON `records` (\n  `empleadoId`,\n  `timestamp`\n)"
  ]

  // remove
  collection.schema.removeField("ejz3dzqi")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_C8PhnFh` ON `records` (\n  `empleadoId`,\n  `tipo`,\n  `timestamp`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejz3dzqi",
    "name": "tipo",
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
})
