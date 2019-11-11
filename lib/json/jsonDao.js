var fs = require("fs");
var shared = require("./shared.js");

module.exports = {
    // Get the client
    loadConf: () => {
        return new Promise(function (resolve, reject) {
            fs.readFile(shared.jsonfile, "utf-8", (err, data) => {
                if (err) {console.log(err);
                    // if something fails
                    reject(err);
                }

                var json = JSON.parse(data);

                resolve(json);
                console.log("Successfully read to File."+JSON.stringify(data));
            });




        })
    },


    // maybe you want to reset client's instance
    dumpConf: (dataToAppend) => {
        return new Promise(function (resolve, reject) {
            fs.readFile(shared.jsonfile, function (err, data) {

                if (err) {
                    console.log(err);
                    // if something fails
                    reject(err);
                } else {


                    var json = JSON.parse(data);
                    json.push(dataToAppend);
                    fs.writeFile(shared.jsonfile, JSON.stringify(json), 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                            // if something fails
                            reject(error);
                        } else {
                            resolve(data);
                            console.log("Successfully Written to File.");
                        }
                    });
                }
            })

        })
    }
}