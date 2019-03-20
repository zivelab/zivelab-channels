// 0x001BC5081000 to 0x001BC5081FFF
const addresses = {
    "ZiveLab": [
        "00:1b:c5:08:10",
        "00:1b:c5:08:11",
        "00:1b:c5:08:12",
        "00:1b:c5:08:13",
        "00:1b:c5:08:14",
        "00:1b:c5:08:15",
        "00:1b:c5:08:16",
        "00:1b:c5:08:17",
        "00:1b:c5:08:18",
        "00:1b:c5:08:19",
        "00:1b:c5:08:1a",
        "00:1b:c5:08:1b",
        "00:1b:c5:08:1c",
        "00:1b:c5:08:1d",
        "00:1b:c5:08:1e",
        "00:1b:c5:08:1f",
    ]
};

// https://gist.github.com/hectorguo/672844c319547498dcb569df583f959d
/**
 * Get Local IP Address
 * 
 * @returns Promise Object
 *
 * getLocalIP().then((ipAddr) => {
 *    console.log(ipAddr); // 192.168.0.122
 * });
 */
function getLocalIP() {
    return new Promise(function(resolve, reject) {
      // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
      var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  
      if (!RTCPeerConnection) {
        reject('Your browser does not support this API');
      }
      
      var rtc = new RTCPeerConnection({iceServers:[]});
      
      function grepSDP(sdp) {
          //var hosts = [];
          var finalIP = '';
          sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
              if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                  const parts = line.split(' ');        // http://tools.ietf.org/html/rfc5245#section-15.1
                  const addr = parts[4];
                  const type = parts[7];
                  if (type === 'host') {
                      finalIP = addr;
                  }
              } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                  const parts = line.split(' ');
                  const addr = parts[2];
                  finalIP = addr;
              }
          });
          return finalIP;
      }
      
      if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
          rtc.createDataChannel('', {reliable:false});
      };
      
      rtc.onicecandidate = function (evt) {
          // convert the candidate to SDP so we can run it through our general parser
          // see https://twitter.com/lancestout/status/525796175425720320 for details
          if (evt.candidate) {
            var addr = grepSDP("a="+evt.candidate.candidate);
            resolve(addr);
          }
      };
      rtc.createOffer(function (offerDesc) {
          rtc.setLocalDescription(offerDesc);
      }, function (e) { console.warn("offer failed", e); });
    });
};

/**
* Build array of full ip range (xxx.xxx.x.1-255) given example ip address
* @param {String} ip
*/
function getFullRange(ip, includeEndpoints=false) {
    if (!validateIPaddress(ip)) return null;

    var ipStart = ip.substr(0, ip.lastIndexOf('.') + 1);
    return includeEndpoints 
        ? Array.from({length: 255}, (el, i) => ipStart + (i + 1))
        : Array.from({length: 253}, (el, i) => ipStart + (i + 2));
};

/**
* Check if the given ip address is valid
* @param {String} ip
*/
function validateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }  
    alert("You have entered an invalid IP address!")  
    return (false)  
};

/**
* Cross references provided mac address with lookup table (incomplete)
* @param {string} mac
* @param {string} type
* @return {string}
*/
function macLookup(mac, type) {
    const leading = mac.toLowerCase().split(':').slice(0, 5).join(':');
    
    if (type && addresses[type]) {
        if (addresses[type].indexOf(leading) > -1) return type;
    }
    
    if (JSON.stringify(addresses).indexOf(leading) === -1) return false;

    for (var vendor in addresses) {
        if (addresses[vendor].indexOf(leading) > -1) return vendor;
    }
}

function isZiveDevice(mac) {
    return macLookup(mac, "ZiveLab") === "ZiveLab";
}

export { getLocalIP, getFullRange, validateIPaddress, macLookup, isZiveDevice };