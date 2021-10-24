const axios = require('axios');

async function getAllStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data; 
}

let exportedMethods = {
    async getStocks() {
        const stockData = await getAllStocks();
        return stockData;
    },

    async getStockById(id) {
        if (arguments.length > 1) throw `there are more illeagal parameters`;
        if (Object.prototype.toString.call(id) !== '[object String]') {
            throw `the parameter's type is not string`;
        }
        if (id.trim() === "") {
            throw `parameter can not be whitespace`;
        }
        id = id.trim();
        const stockData = await getAllStocks();
        let ansObj = null;
        for (let i = 0; i < stockData.length; ++i) {
            if (id === stockData[i].id) {
                ansObj = stockData[i];
            }
        }
        if (ansObj === null) throw `stock not found`;
        return ansObj;
    }
}
module.exports = exportedMethods;