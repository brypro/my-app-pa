/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("eihs6ju6le1qkl6")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1511310331",
    "max": 0,
    "min": 0,
    "name": "nfc",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("eihs6ju6le1qkl6")

  // remove field
  collection.fields.removeById("text1511310331")

  return app.save(collection)
})