const filesystem = require ('fs')

const createTxt = (file_name, text)  => {
    const file = file_name + '.txt'
    filesystem.writeFileSync(file, text, {encoding: 'utf-8'})
}

module.exports = {createTxt}