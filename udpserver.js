// UDP Sample Server

// UDP 待受ポート
var s_port = 41234;
var dgram = require("dgram");
var server = dgram.createSocket("udp4");

// Listen 状態になったときの処理
server.on("listening", function() {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
});

// メッセージを受信した時の処理
server.on("message", function(msg, rinfo) {
  console.log("server got a message from " + rinfo.address + ":" + rinfo.port);
  console.log("  HEX  : " + msg.toString('hex'));
  console.log("  ASCII: " + msg);
  var ack = new Buffer("ack");
  server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function(err, bytes) {
    console.log("sent ACK.");
  }); 
});

// メッセージ受信でエラーがあったときの処理
server.on("error", function(err) {
  console.log("server error: \n" + err.stack);
  server.close();
});

// Socket がクローズしたときの処理
server.on("close", function() {
  console.log("closed.");
});

// 待受開始
server.bind(s_port);
