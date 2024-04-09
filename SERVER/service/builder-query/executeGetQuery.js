const {Op} = require("sequelize");
const executeQuery = async (Model, query, options) => {
    const result = {};
    try {
        const response = await Model.findAndCountAll({
            where: query,
            ...options
        });
        result.success = response.rows && response.rows.length > 0;
        result.data = response;
        result.totalCount = response.count;
        result.totalPages = Math.ceil(response.count / options.limit);
        result.currentPage = options.offset ? Math.floor(options.offset / options.limit) + 1 : 1;
        return result;
    } catch (error) {
        throw error;
    }
};


const querySortByOptions = (sort) => {
    return sort.split(",").map(el => el.startsWith('-') ? [el.replace("-", ""), 'DESC'] : [el.replace("+", ""), 'ASC']);
};

const queryWhereOptions = (query) => {
    return Object.keys(query).reduce((acc, key) => {
        if (query[key].includes('%')) {
            acc[key] = {[Op.iLike]: `%${query[key]}%`}
            return acc;
        } else {
            acc[key] = query[key]
            return acc;
        }
    }, {})
};

const queryPagination = (options,limit, page) => {
    if (limit) {
        options.limit = +limit;
    }
    if (page) {
        const pageNumber = +page;
        options.offset = (pageNumber - 1) * options.limit;
    } else {
        options.limit = null;
        options.offset = 0;
    }
    return options;
}


module.exports = {
    executeQuery,
    queryWhereOptions,
    querySortByOptions,
    queryPagination
}
