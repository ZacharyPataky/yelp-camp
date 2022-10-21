if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const helmet = require('helmet');
const User = require('./models/user')
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');

const mongoSanitize = require('express-mongo-sanitize');

const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

const MongoDBStore = require('connect-mongo');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
const secret = process.env.SECRET || 'devSecret';

mongoose.connect(dbUrl, {
// mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
    replaceWith: '_'
}));

const store = new MongoDBStore({
    mongoUrl: dbUrl, 
    secret: secret,
    touchAfter: 24 * 60 * 60  // hours * minutes * seconds
});

store.on('error', function (err) {
    console.log(`Session Error: ${err}`);
});

const sessionConfig = {
    store,
    name: 'session',  // Session name
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,  // 1000 ms/s, 60 s/m, 60 m/h, 24 h/d, 7d/w -> Expires after one week
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        // secure: true  // This cookie should only work over https
    }
};
app.use(session(sessionConfig));
app.use(flash());

// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://cdn.jsdelivr.net/",
//     "https://res.cloudinary.com/dv5vm4sqh/"
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/",
//     "https://cdn.jsdelivr.net/",
//     "https://res.cloudinary.com/dv5vm4sqh/"
// ];
// const connectSrcUrls = [
//     "https://*.tiles.mapbox.com",
//     "https://api.mapbox.com",
//     "https://events.mapbox.com",
//     "https://res.cloudinary.com/dv5vm4sqh/"
// ];
// const fontSrcUrls = ["https://res.cloudinary.com/dv5vm4sqh/"];

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/********/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
//                 "https://images.unsplash.com/"
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//             mediaSrc: ["https://res.cloudinary.com/dv5vm4sqh/"],
//             childSrc: ["blob:"]
//         }
//     })
// );

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

// All requests
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;  // The ExpressError from above!
    if (!err.message) {
        err.message = 'Oh no! Something went wrong!';
    }
    res.status(statusCode).render('error', { err });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on Port ${port}`);
});
