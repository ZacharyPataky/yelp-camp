const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dbrp4ycp1/image/upload/v1666046624/YelpCamp/paumltnaqo7zorynwhqv.jpg',
          filename: 'YelpCamp/paumltnaqo7zorynwhqv',
        },
        {
          url: 'https://res.cloudinary.com/dbrp4ycp1/image/upload/v1666046624/YelpCamp/tul4hsu7fxmm6s1sqabb.jpg',
          filename: 'YelpCamp/tul4hsu7fxmm6s1sqabb',
        },
        {
          url: 'https://res.cloudinary.com/dbrp4ycp1/image/upload/v1666046624/YelpCamp/jzoif8wqyyqvf4dyqno1.jpg',
          filename: 'YelpCamp/jzoif8wqyyqvf4dyqno1',
        }
      ],
      price: price,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, necessitatibus. Dolorum eos, debitis at sit eligendi facilis placeat amet non impedit numquam itaque id maiores aperiam! Necessitatibus a eaque culpa.',
      author: '634ddb60f3a8791c2699d59f'  // Your User ID
    });
    await camp.save()
  }
};

seedDB().then(() => {
  mongoose.connection.close()
});