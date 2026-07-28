const mongoose = require("mongoose");
const Category = require("../models/category.model");

const migrateCategoryIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: "categories" }).toArray();
    
    if (collections.length === 0) {
      console.log("[Migration] 'categories' collection does not exist yet. Creating indexes via Mongoose...");
      await Category.syncIndexes();
      return;
    }

    const categoriesCollection = db.collection("categories");
    const existingIndexes = await categoriesCollection.indexes();

    for (const index of existingIndexes) {
      // Keep primary key index
      if (index.name === "_id_") continue;

      const keys = Object.keys(index.key);
      const isSlugIndex = keys.includes("slug") || index.name.includes("slug");
      const isSingleUniqueOrgIdIndex = keys.length === 1 && keys[0] === "organizationId" && index.unique;

      if (isSlugIndex || isSingleUniqueOrgIdIndex) {
        console.log(`[Migration] Dropping obsolete/invalid index: ${index.name}`);
        await categoriesCollection.dropIndex(index.name);
      }
    }

    // Backfill normalizedName for existing categories if missing
    const unnormalizedDocs = await categoriesCollection.find({
      $or: [{ normalizedName: { $exists: false } }, { normalizedName: null }, { normalizedName: "" }]
    }).toArray();

    for (const doc of unnormalizedDocs) {
      if (doc.name) {
        const normalizedName = doc.name.trim().toLowerCase();
        await categoriesCollection.updateOne(
          { _id: doc._id },
          { $set: { normalizedName } }
        );
        console.log(`[Migration] Backfilled normalizedName '${normalizedName}' for Category ID ${doc._id}`);
      }
    }

    // Sync Mongoose model schema indexes with MongoDB
    await Category.syncIndexes();
    console.log("[Migration] Category collection indexes synchronized successfully.");
  } catch (error) {
    console.error("[Migration] Error during Category index migration:", error.message);
  }
};

module.exports = migrateCategoryIndexes;
