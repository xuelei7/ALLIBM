//CSVファイルを読み込む関数getCSV()の定義
function getCSV(dataURL){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", dataURL, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    console.log("sent null");
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
        console.log("get response");
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}
 
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    //[time(msec), reaction, id]
    //reaction,,,0;ok,1:NG,2:?,3:smile
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
    console.log("result");
    console.log(result)
    return result;
}

function makeData() {
    //読み込むファイルの場所
    var dataURL = "../data/clickdata.csv";
    //サンプリングする間隔
    var timegroup = 500;
    var raw = getCSV(dataURL);
    console.log("raw data: ");
    console.log(raw);


    //reactionごと，時間ごとのカウント
    var count = [];
    for (var i = 0; i < raw.length; i++) {
        var rec = raw[i];
        var time = Number(rec[0]);
        var reaction = Number(rec[1]);
        var id = Number(rec[2]);
        count[reaction][time/timegroup]++;
    }
    console.log(count[1][0]);
}

//グラフ
function makeGraph(result) {
    var ctx = document.getElementById("LineChart");
    var myLineChart = new Chart(ctx, {type: 'line',
    data: {
        labels: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'],
        datasets: [
        {
            label: 'OK',
            data: [35, 34, 37, 35, 34, 35, 34, 25],
            borderColor: "rgba(255,0,0,1)",
            backgroundColor: "rgba(0,0,0,0)"
        },
        {
            label: 'NG',
            data: [25, 27, 27, 25, 26, 27, 25, 21],
            borderColor: "rgba(0,0,255,1)",
            backgroundColor: "rgba(0,0,0,0)"
        },
        {
            label: '?',
            data: [0,3,6,8,22,17,0,0],
            borderColor: "rgba(0,255,0,1)",
            backgroundColor: "rgba(0,0,0,0)"
        },
        {
            label: 'smile',
            data: [13,50,12,15,9,39,40],
            borderColor: "rgba(255,255,0,1)",
            backgroundColor: "rgba(0,0,0,0)"
        },
        {
            label: 'viewers',
            data: [700,500,400,500,600,400,800],
            borderColor: "rgba(0,255,255,1)",
            backgroundColor: "rgba(0,0,0,0)"
        }
        ],
    },
    options: {
        title: {
        display: true,
        text: '学生反応集計データ'
        },
        scales: {
        yAxes: [{
            ticks: {
            suggestedMax: 40,
            suggestedMin: 0,
            stepSize: 10,
            callback: function(value, index, values){
                return  value +  '回'
            }
            }
        }]
        },
    }
    });
}

makeGraph();