var peer = new Peer({
  config: {
    'iceServers': [
      {
        url: 'stun:global.stun.twilio.com:3478',
        urls: 'stun:global.stun.twilio.com:3478'
      },
      {
        url: 'turn:global.turn.twilio.com:3478?transport=udp',
        username: '31eb6782eba4e16884136d09d7e9b1c74abd0c1838f1554e39429f43df4062d8',
        urls: 'turn:global.turn.twilio.com:3478?transport=udp',
        credential: 'fpwdgRw9Xf69IuulNBwdtB1MHMgQZa9z8rUhNfAUY1M='
      },
      {
        url: 'turn:global.turn.twilio.com:3478?transport=tcp',
        username: '31eb6782eba4e16884136d09d7e9b1c74abd0c1838f1554e39429f43df4062d8',
        urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
        credential: 'fpwdgRw9Xf69IuulNBwdtB1MHMgQZa9z8rUhNfAUY1M='
      },
      {
        url: 'turn:global.turn.twilio.com:443?transport=tcp',
        username: '31eb6782eba4e16884136d09d7e9b1c74abd0c1838f1554e39429f43df4062d8',
        urls: 'turn:global.turn.twilio.com:443?transport=tcp',
        credential: 'fpwdgRw9Xf69IuulNBwdtB1MHMgQZa9z8rUhNfAUY1M='
      }
    ]
  }
});
const stream = navigator.mediaDevices.getUserMedia({ video: false, audio: true });
peer.on('open', function () {
  console.log('peer:', peer.id);
  document.getElementById('text-peer').innerHTML = peer.id;
  peer.on("call", (call) => {
    console.log('call--------------------', call)
    stream.then((stream) => {
      call.answer(stream); // Answer the call with an A/V stream.
      call.on("stream", (remoteStream) => {
        console.log('stream12', remoteStream)
        const videoElement = document.querySelector('audio#localAudio');
        videoElement.srcObject = remoteStream;
        // Show stream in some <video> element.
      });
    });
  });
});
var conn = undefined;
function connect() {
  const id = document.getElementById('text').value
  var conn = peer.connect(id);
  // on open will be launch when you successfully connect to PeerServer
  conn.on('open', function () {
    // here you have conn.id
    conn.send('hi!');
  });

  peer.on('connection', function (conn) {
    conn.on('data', function (data) {
      // Will print 'hi!'
      console.log('connection', data);
    });
  });
  stream.then(stream => {
    console.log('call--------------------1', stream)
    const call = peer.call(id, stream);
    console.log('call--------------------2')
    call.on("stream", (remoteStream) => {
      console.log('stream1', remoteStream)
      const videoElement = document.querySelector('audio#localAudio');
      videoElement.srcObject = remoteStream;
      // Show stream in some <video> element.
    });
  })
}