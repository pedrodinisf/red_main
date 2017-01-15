var data = [];
//  É o cliente que constroi isto
console.log('Cliente vai gerar os dados a usar no chart');
for (var i = 1; i <= 100; i++) {
    var m = "01", d = i;
    if (d > 31) {
        m = "02";
        d -= 31;
    }
    if (m == "02" && d > 28) {
        m = "03";
        d -= 28;
    }
    if (m == "03" && d > 31) {
        m = "04";
        d -= 31;
    }
    if (d < 10)
        d = "0" + d;
    data.push([new Date("2010/" + m + "/" + d), i, 100 - i, 1e6 * (1 + i * (100 - i) / (50 * 50)), 1e6 * (2 - i * (100 - i) / (50 * 50))])
}

// GET CSV FROM SERVER
var req = new XMLHttpRequest();
req.onreadystatechange = function () {
    if (req.readyState == 4) {
        if (req.status === 200 || // Normal http
            req.status === 0) { // Chrome w/ --allow-file-access-from-files
            var data = req.responseText;
            drawGraph(data);
        }
    }
};
req.open('GET', '/public/4CO00871-RRC_Estab_200days.csv', true);
req.send(null);


//console.log(var)
function drawGraph(data) {
    var g = new Dygraph(
        document.getElementById("demodiv"),
        data,
        {
            labelsDiv: document.getElementById('status'),
            labelsSeparateLines: true,
            labelsKMB: true,
            colors: ["rgb(51,204,204)", "rgb(255,100,100)", "#00DD55", "rgba(50,50,200,0.4)"],
            width: 640,
            height: 400,
            title: '4CO00871 - Figueira da Foz Centro -- RRC Evolution (200days)',
            xlabel: 'Date', ylabel: '#'
        }
    );
}

//--------------------------------
//NOTA: a variavel g perdeu o contexto nesta funcao. Adaptar g --> grafico
function createImage() {
    if (!Dygraph.Export.isSupported()) {
        //alert('This browser does not support exporting a dygraph as a PNG image. :-(');
        var notsupported = document.getElementById('notsupported');
        notsupported.style.display = 'block';
        var exportDiv = document.getElementById('export-div');
        exportDiv.style.display = 'none';
        return;
    }
    var img = document.getElementById('demoimg');
    Dygraph.Export.asPNG(g, img);
    //opens in new window
    //document.location.href = img.src;
}

var btn = document.getElementById("update-img");
btn.onclick = function () {
    createImage()
};

//createImage();
