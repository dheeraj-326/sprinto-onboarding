import { Author, Book } from "../../dao/models.js";

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    books: async () => {
      return await Book.findAll();
    },
    book: async (parent, args) => {
      const id = args.id;
      return await Book.findByPk(id);
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
      const authorInput = bookInput.author;
      console.log(`Querying author with name ${authorInput.name}`);
      let author = await Author.findOne({
        where: {
          name: authorInput.name,
          born_date: authorInput.born_date
        }
      });
      if (author === null) {
        console.log(`Creating new author with name ${authorInput.name}`);
        author = await Author.create({
          name: authorInput.name,
          biography: authorInput.biography,
          born_date: authorInput.born_date
        });
      }
      const book = await Book.create({
        title: bookInput.title,
        description: bookInput.description,
        published_date: bookInput.published_date,
        author_id: author.id
      });

      return await Book.findByPk(book.id, { include: Author });
    }
  }
};