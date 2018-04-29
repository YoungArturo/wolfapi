var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  const { headers, method, url } = req;
  res.writeHead(200, {'Content-Type': 'text/html'});
  console.log(url);
  var call = url.substr(1);
  
  
  const WolframAlphaAPI = require('/node_modules/wolfram-alpha-api');
  const waApi = WolframAlphaAPI('U72E65-ARQERXR86Y');

  API();
  function API(){
    if(call ===""){
      res.end('<html><body><h1>There was an error please refresh.</h1></body></html>');
    }
    else{
      waApi.getFull({
        input: 'prove by induction (3n)! > 3^n (n!)^3 for n>0',  
        podstate: 'Solution__Step-by-step solution',
        format: 'mathml',
      }).then((queryresult) => {
        console.log(queryresult.pods[0].subpods[0].plaintext)
      }).catch(console.error);
    }
  }
}).listen(process.env.PORT || 5000);