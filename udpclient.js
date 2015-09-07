// UDP Sample Client

// UDP 接続先
var host = "localhost";
var c_port = 41234;
var dgram = require("dgram");
var client = dgram.createSocket("udp4");

// サーバに送信するメッセージ
// var message = new Buffer("hello");
var message = new Buffer("3031323334353637", "hex");

// サーバからメッセージ受信したときの処理
client.on("message", function(msg, rinfo) {
  console.log("recieved: " + msg.toString("hex"));
  client.close();
});

// メッセージ送信でエラーが起きた時の処理
client.on("err", function(err) {
  console.log("client error: \n" + err.stack);
  console.close();
});

// Socket をクローズした時の処理
client.on("close", function() {
  console.log("closed.");
});

// メッセージ送信
send(message, host, c_port);
function send(message, host, port) {
  client.send(message, 0, message.length, port, host, function(err, bytes) {
    console.log("sent.");
  });
}
