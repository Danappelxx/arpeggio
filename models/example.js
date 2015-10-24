/* global Books SimpleSchema */
Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  copies: {
    type: Number,
    label: "Number of copies",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Last date this book was checked out",
    optional: true
  },
  summary: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  }
}));

// Docs: https://github.com/aldeed/meteor-autoform/
// Examples: http://autoform.meteor.com
// AutoForm would look like this (in a template):
// <template name="insertBookForm">
//   {{> quickForm collection="Books" id="insertBookForm" type="insert"}}
// </template>
