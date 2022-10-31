# yelp-camp
Capstone project for Colt Steele's Web Developer Bootcamp 2022

Are you itching for the wild but unfamiliar with campgrounds near you?  Fret not, my friend, for we have you covered.  Welcome to YelpCamp, the one-stop shop for all of your camping locations.

YelpCamp is the capstone project included in Colt Steele's Web Developer Bootcamp 2022 as seen on Udemy.  YelpCamp is not an original product of my mind; instead, I coded along with Mr. Steele as he explained the website's design and architecture.  I deviated from the code sparingly (primarily to accommodate newer versions of the various frameworks/versions used), maintaining the intended learning goals Mr. Steele designed.

Here are some of the packages/frameworks used in the development of this website:

* Bootstrap - Bootstrap is a free front-end framework for faster and easier web development.  It includes HTML- and CSS-based design templates for typography, forms, buttons, tables, navigation, modals, image carousels, and others, many of which are featured in YelpCamp.  For example, the "card" layout depicting each campground on the "campgrounds" page is a Bootstrap "card" with specialized sections for content.  Another example of bootstrap is the clean and responsive navigation bar.

* Cloudinary -  Cloudinary is a SaaS cloud-based image and video management service.  Instead of having to save and load every image uploaded by users (which would amount to many images and desperately slow application), we instead call images saved online in our Cloudinary account.  It's faster, lighter, and much more robust overall.

* EJS - EJS (Embeddded JavaScript) is a simple templating language that lets us generate HTML markup with plain JavaScript.  This tool simplifies the process of displaying dynamic and varied data on the webpage.  For an example of this, look no further than our "campground" cards.  YelpCamp posseses an ever-growing selection of campgrounds, none of which prematurely defined.  Instead, whenever we reach a new campground, we extract that campground's data and stitch it into an EJS card template.  From there, we display a "pre-filled" card.  Pretty nifty, eh?

* Express - Express is a back-end web application framework for building RESTful APIs with Node.js.  It's built around configuration and granular simplicity of "connect" middleware.  It helped us organize YelpCamp into a MVC architecture on the server side, as well as employ MongoDB for holding server data.

* Express Session - This is a simple session middleware used in conjunction with Express.  It's used, naturally, for maintaining user sessions; these fellas are important because we can maintain a logged-in user's data despite hopping pages throughout the application.

* Helmet - Helmet is an Express middleware that helps us set YelpCamp's security-related HTTP response headers.

* Joi - 

* Mongoose - 

* MongoDB -

* Multer - 

* Node.js - 

* Passport - 

And, of course, here's the link to this awesome website: http://yelpcamp-zp.herokuapp.com/

NOTE: If you wish to add your own campgrounds and reviews, you must first register an account.  From there, you may also edit or delete such elements.
