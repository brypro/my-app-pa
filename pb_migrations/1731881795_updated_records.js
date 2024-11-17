/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_C8PhnFh` ON `records` (\n  `empleadoId`,\n  `tipo`,\n  `timestamp`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kekd5cvj99qlcn9")

  collection.indexes = []

  return dao.saveCollection(collection)
})
