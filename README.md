# yelp-camp
Capstone project for Colt Steele's Web Developer Bootcamp 2022

Are you itching for the wild but unfamiliar with campgrounds near you?  Fret not, my friend, for we have you covered.  Welcome to YelpCamp, the one-stop shop for all of your camping locations.

YelpCamp is the capstone project included in Colt Steele's Web Developer Bootcamp 2022 as seen on Udemy.  YelpCamp is not an original product of my mind; instead, I coded along with Mr. Steele as he explained the website's design and architecture.  I deviated from the code sparingly (primarily to accommodate newer versions of the various frameworks/versions used), maintaining the intended learning goals Mr. Steele designed.

Here are some of the packages/frameworks used in the development of this website:

* `Bootstrap` - Bootstrap is a free front-end framework for faster and easier web development.  It includes HTML- and CSS-based design templates for typography, forms, buttons, tables, navigation, modals, image carousels, and others, many of which are featured in YelpCamp.  For example, the "card" layout depicting each campground on the "campgrounds" page is a Bootstrap "card" with specialized sections for content.  Another example of bootstrap is the clean and responsive navigation bar.

* Cloudinary -  Cloudinary is a SaaS cloud-based image and video management service.  Instead of having to save and load every image uploaded by users (which would amount to many images and a desperately slow application), we instead call images saved online in our Cloudinary account.  It's faster, lighter, and much more robust overall.

* EJS - EJS (Embedded JavaScript) is a simple templating language that lets us generate HTML markup with plain JavaScript.  This tool simplifies displaying dynamic and varied data on the webpage.  For example, look no further than our "campground" cards.  YelpCamp possesses an ever-growing selection of campgrounds, none of which are prematurely defined.  Instead, we extract that campground's data and stitch it into an EJS card template whenever we reach a new campground.  From there, we display a "pre-filled" card.  Pretty nifty, eh?

* Express - Express is a back-end web application framework for building RESTful APIs with Node.js.  It's built around configuration and the granular simplicity of "connect" middleware.  It helped us organize YelpCamp into an MVC architecture on the server side and employ MongoDB to hold server data.

* Express Session - This is a simple session middleware used in conjunction with Express.  It's used, naturally, for maintaining user sessions; these fellas are vital because we can keep a logged-in user's data despite hopping pages throughout the application.

* Helmet - Helmet is an Express middleware that helps us set YelpCamp's security-related HTTP response headers.

* Joi - Joi is a powerful schema description language and data validator for JavaScript.  We use it in YelpCamp to validate new campground data.  Suppose a user attempts to pass a string as a new campground's price.  This is problematic since prices are represented as numbers.  To block this, Joi will throw a detailed error halting the user from submitting the erroneous form.

* Mongoose - Mongoose is a Node.js-based Object Data Modeling (ODM) library for MongoDB.  It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.  It's used in YelpCamp to CRUD user accounts, campgrounds, reviews, etc.

* MongoDB - MongoDB is a NoSQL document database that uses JSON-like documents with optional schemas.  Since YelpCamp employs more dynamic schemas and unstructured data, MongoDB seemed a much better choice than our typical MySQL.

* Multer - Multer is a Node.js middleware that simplifies the painstaking process of uploading files.  It's used in YelpCamp to upload various images when creating a campground.

* Node.js - Node.js is an asynchronous event-driven JavaScript runtime that's designed to build scalable network applications.  It's the backbone of our lovely little application, providing the foundation for our many libraries and frameworks.

* Passport - Passport is an authentication middleware for Node.js.  YelpCamp uses it to simplify the creation and authentication of users operating the application.

And, of course, here's the link to this awesome website: http://yelpcamp-zp.herokuapp.com/

NOTE: If you wish to add your own campgrounds and reviews, you must first register an account.  From there, you may also edit or delete such elements.
