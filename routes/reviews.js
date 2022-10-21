const express = require('express');
const router = express.Router({ mergeParams: true });  // Ensures that Campground ID parameters are carried over

const reviews = require('../controllers/reviews')

const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;