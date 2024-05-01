import userResolvers from './user.js';
import bookResolvers from './book.js';
import paymentResolvers from './payment.js';

// Root resolver
const root = {
    ...userResolvers,
    ...bookResolvers,
    ...paymentResolvers
};

export default root;
