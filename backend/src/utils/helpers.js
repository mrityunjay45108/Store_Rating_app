// calculate average rating
const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / ratings.length;
};

// format date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// validate sort parameters
const validateSortParams = (sortBy, allowedFields) => {
    if (!allowedFields.includes(sortBy)) {
        return allowedFields[0];
    }
    return sortBy;
};

// build search query
const buildSearchQuery = (baseQuery, searchFields, searchTerm) => {
    if (!searchTerm) return baseQuery;
    
    const conditions = searchFields.map(field => `${field} ILIKE '%${searchTerm}%'`);
    return `${baseQuery} AND (${conditions.join(' OR ')})`;
};

module.exports = {
    calculateAverageRating,
    formatDate,
    validateSortParams,
    buildSearchQuery
};