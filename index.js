const http = require("http");
const fs = require("fs");
var requests = require("requests");


const home = fs.readFileSync("index.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

  const server =http.createServer((req,res)=>{

    if(req.url =='/about'){
        requests(
            'https://api.openweathermap.org/data/2.5/weather?q=Agra&appid=886705b4c1182eb1c69f28eb8c520e20'
            )
        .on('data',  (chunk)=> {
            const obj = JSON.parse(chunk);
            const arr = [obj]
            // console.log(arr[0].main.temp)
            const realwe = arr
            .map((val)=>replaceVal(home,val)).join('')
            // console.log(realwe)
            res.write(realwe)
        })
        .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
        });
    }
    else{
        res.end("File not found")
    }
})

server.listen(8001,'127.0.0.1')
