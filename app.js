const fs = require('node:fs');
const path = require('node:path')



const genderSwitcher =  (read, write, gender) => {
    fs.readdir(path.join(__dirname, read), (err, files) => {
        if (err) {
            return console.log(err)
        }

        files.forEach((file) => {
            const folderPath = path.join(__dirname, read, file)
            fs.readFile(folderPath, (err, data) => {
                if (err) {
                    return console.log(err)
                }

                const person = JSON.parse(data.toString())
                if (person.gender === gender) {
                    fs.rename(folderPath, path.join(__dirname, write, file), (err) => {
                        if (err) {
                            return console.log(err)
                        }
                    })
                }
            })
        })
    })
}

genderSwitcher('male','female','female')
genderSwitcher('female','male','male')
