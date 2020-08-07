// Data importation
const _data = require('./data.json')

// Traduction helper

const translator = origin => {
    switch (origin) {
        case "brand": return "Marca"
        case "model": return "Modelo"
        case "doors": return "Puertas"
        case "price": return "Precio"
        case "engine": return "Cilindrada"
    }
}

const divideText = () => '=============================\n'

const getAll = data => {
    let out = ''
    data.map(elm => {
        for (prop in elm) {
            out += `${translator(prop)}: ${prop === 'price' ? new Intl.NumberFormat("en-IN", {
                currency: 'USD',
                style: 'currency'
            }).format(elm[prop]) : prop === 'engine' ? elm[prop] + 'c' : elm[prop]
                } // `
        }
        out = out.slice(0, out.length - 3)
        out += '\n'
    })

    return out
}

// If we look out for both the performance get increased
const getCheapAndExpensive = (data) => {
    data.sort((a, b) => b - a)

    return {
        expensive: data[0].brand + ' ' + data[0].model,
        cheap: data[data.length - 1].brand + ' ' + data[data.length - 1].model
    }
}

const getByLetter = (data, letter) => {
    const finded = data.filter(elm => elm.model.includes(letter) && elm)[0]

    return finded.brand + ' ' + finded.model + ' ' + new Intl.NumberFormat("en-IN", {
        currency: 'USD',
        style: 'currency'
    }).format(finded.price)
}



const getConcretes = (data, letter) => {
    const { expensive, cheap } = getCheapAndExpensive(data)

    return (

        'Vehículo más caro: ' + expensive + '\n' +
        'Vehículo más barato: ' + cheap + '\n' +
        `Vehículo que contiene en el modelo la letra ${letter}: ` + getByLetter(data, letter)
        + '\n'
    )
}

const getBiggerToLower = data => {
    const out = data.sort((a, b) => b.price - a.price).reduce((acc, sum) => acc + (`${sum.brand} ${sum.model}\n`), '')
    return out.slice(0, out.length - 1)
}

// Main function
const excercise = data => {
    return (
        getAll(data)
        + divideText()
        + getConcretes(data, 'Y')
        + divideText()
        + getBiggerToLower(data)
    )
}

const showExcercise = () => console.log(excercise(_data))


showExcercise()