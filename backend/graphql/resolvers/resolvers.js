import { Op } from "sequelize";
import { Author, Book } from "../../dao/models.js";

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    books: async (_, args) => {
      const {
        title,
        authorId,
        description,
        publishedBefore,
        publishedAfter,
        limit,
        offset
      } = args;
      let where = {}
      if (title)
        where.title = { [Op.iLike]: `%${title}%`};
      if (description)
        where.description = { [Op.iLike]: `%${description}%`};
      if (authorId)
        where.authorId = authorId;
      if (publishedBefore)
        where.published_date = { ...(where.published_date || {} ), [Op.lt]: publishedBefore }
      if (publishedAfter)
        where.published_date = { ...(where.published_date || {}), [Op.gt]: publishedAfter }
      return await Book.findAll({
        where,
        limit,
        offset,

      });
    },
    book: async (parent, args) => {
      const id = args.id;
      return await Book.findByPk(id);
    },
    authors: async (_, args) => {
      const {
        name,
        biography,
        bornBefore,
        bornAfter,
        limit,
        offset
      } = args
      let where = {}
      if (name)
        where.name = { [Op.iLike]: `%${name}%` }
      if (biography)
        where.biography = { [Op.iLike]: `%${biography}%` }
      if (bornBefore)
        where.born_date = { ...(where.born_date || {}), [Op.lt]: bornBefore }
      if (bornAfter)
        where.born_date = { ...(where.born_date || {}), [Op.gt]: bornAfter }
      return await Author.findAll(
        {
          where,
          limit,
          offset
        }
      );
    },
    author: async (parent, args) => {
      const id = args.id;
      return await Author.findByPk(id);
    }
  },
  Book: {
    author: async (parent) => {
      return await Author.findByPk(parent.author_id);
    },
  },
  Author: {
    books: async (parent) => {
      return await Book.findAll({
        where: {
          author_id: parent.id
        }
      })
    }
  },
  Mutation: {
    editBook: async (parent, args) => {
      const bookInput = args.book;
      let book = await Book.findByPk(bookInput.id);
      if (book === null) {
        throw new Error(`Book with id ${book.id} not found`);
      }
      book.title = bookInput.title;
      book.description = bookInput.description;
      book.published_date = bookInput.published_date;
      await book.save();
      return book;
    },
    createBook: async (parent, args) => {
      const bookInput = args.book;
      const authorId = bookInput.author_id;
      let author = await Author.findByPk(authorId);
      if (author === null) {
        const errorMesage = `Author with id ${authorId} does not exist`;
        throw new Error(errorMesage);
      }
      const book = await Book.create({
        title: bookInput.title,
        description: bookInput.description,
        published_date: bookInput.published_date,
        author_id: authorId
      });

      return await Book.findByPk(book.id, { include: Author });
    },
    deleteBook: async (parent, args) => {
      const bookId = args.id;
      try {
          await Book.destroy({
          where: {
            id: bookId
          }
        });
      } catch (error) {
        console.error(`Error while deleting book with id: ${bookId}: ${error}`)
        return false;
      }
      return true;
    },
    editAuthor: async (parent, args) => {
      const authorInput = args.author;
      let author = await Author.findByPk(authorInput.id);
      if (author === null) {
        throw new Error(`Author with id ${author.id} not found`);
      }
      author.name = authorInput.name;
      author.biography = authorInput.biography;
      author.born_date - authorInput.born_date;
      await author.save();
      return author;
    },
    createAuthor: async (parent, args) => {
      const authorInput = args.author;
      console.log(`Creating new author with name ${authorInput.name}`);
      const author = await Author.create({
        name: authorInput.name,
        biography: authorInput.biography,
        born_date: authorInput.born_date
      });

      return author;
    },
    deleteAuthor: async (parent, args) => {
      const authorId = args.id;
      try {
          const books = await Book.findAll({
            where: {
              author_id: authorId
            }
          });
          if (books.length > 0)
            throw new Error(`Author ${authorId} cannot be deleted as there are ${books.length} books which refer to it`);
          await Author.destroy({
          where: {
            id: authorId
          }
        });
      } catch (error) {
        console.error(`Error while deleting author with id: ${authorId}: ${error}`)
        return false;
      }
      return true;
    }
  }
};