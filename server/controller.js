const houses = require("./db.json")

let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        const {id} = req.params
        let index = houses.findIndex(h => h.id === +id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body
        let newHouse = {
            id: globalId,
            address,
            price: +price,
            imageURL
        }
        if(!address || !price || !imageURL) {
            res.status(400).send("Missing Informaton")
        } else {
        houses.push(newHouse)
        globalId++
        res.status(200).send(houses)
        }      
    },
    updateHouse: (req, res) => {
        const { id } = req.params
        const {type} = req.body
        let index = houses.findIndex(h => h.id === +id)

        if(type === 'plus') {
            houses[index].price+=10000
        } else if(type === 'minus') {
            houses[index].price-=10000
        } else {
            res.sendStatus(400).send('Error')
        }

        res.status(200).send(houses)
    }
}