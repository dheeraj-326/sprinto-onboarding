
// 1. **Book Model**
//     - Properties: title, description, published_date, author_id (foreign key referencing the Author model)
// 2. **Author Model**
//     - Properties: name, biography, born_date

import getSequelize from "./pgsql.js";
import { Model, DataTypes } from "sequelize";

const sequelize = getSequelize();

class Book extends Model {}

Book.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  published_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  author_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "authors",
      key: "id"
    }
  },
}, {
  sequelize,
  modelName: "Book",
  tableName: "books",
});

class Author extends Model {}

Author.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: false
  },
  born_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: "Author",
  tableName: "authors",
});

Book.belongsTo(Author, { foreignKey: "author_id" });
Author.hasMany(Book, { foreignKey: "author_id" });

async function initTables() {
    await Author.sync();
    await Book.sync();
}

export { Book, Author, initTables };