$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:4000/users',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded',
    data: {username: 'neha', orgName: 'Org1'},
    success: function (result) {
      if (result.token != null || result.token != 'undefined') {
      var token = result.token;
        $.ajax({
          url: 'http://localhost:4000/channels/mychannel/chaincodes/mycc',
          type: 'POST',
          traditional: true,
          data: {
            "peers": ["peer0.org1.example.com"],
            "fcn": "write",
            "args": ["1","2","3","4","5"]
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: function (response) {
            console.log(response);
          }
        });
      }
    }
  });
});
