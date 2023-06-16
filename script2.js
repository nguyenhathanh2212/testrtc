var peer = new Peer({
  host: "localhost",
  port: 9001,
  path: '/peerjs',
  debug: 3,
  // config: {
  //     'iceServers': [
  //         { url: 'stun:stun1.l.google.com:19302' },
  //         {
  //             url: 'turn:numb.viagenie.ca',
  //             credential: 'muazkh',
  //             username: 'webrtc@live.com'
  //         }
  //     ]
  // }
});
const stream = navigator.mediaDevices.getUserMedia({ video: false, audio: true });
peer.on('open', function () {
  console.log('peer:', peer.id);

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