use('plp_bookstore');
db.createCollection("books")

// Find all books in Thriller genre
db.books.find({ genre: "Thriller" })

// Find books published after 2015
db.books.find({ published_year: { $gt: 2015 } })

// Find books by a specific author
db.books.find({ author: "Alex Michaelides" })

// Update price
db.books.updateOne({ title: "The Silent Patient" }, { $set: { price: 1300 } })

// Delete a book by title
db.books.deleteOne({ title: "The Silent Patient" })

// In stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting by price
db.books.find().sort({ price: 1 }) // ascending
db.books.find().sort({ price: -1 }) // descending

// Pagination
db.books.find().skip(0).limit(5) // Page 1
db.books.find().skip(5).limit(5) // Page 2

// Average price by genre
db.books.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
  ])
  
  // Author with most books
  db.books.aggregate([
    { $group: { _id: "$author", bookCount: { $sum: 1 } } },
    { $sort: { bookCount: -1 } },
    { $limit: 1 }
  ])
  
  // Group by publication decade
  db.books.aggregate([
    {
      $group: {
        _id: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ])

  // Index on title
db.books.createIndex({ title: 1 })

// Compound index
db.books.createIndex({ author: 1, published_year: -1 })

// Check performance
db.books.find({ title: "The Silent Patient" }).explain("executionStats")
