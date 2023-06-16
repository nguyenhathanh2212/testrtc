const p = new SimplePeer({
  initiator: location.hash === "#1",
  trickle: false,
});

navigator.mediaDevices.enumerateDevices().then(function (devices) {
  devices.forEach(function (device) {
    console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
  });
});