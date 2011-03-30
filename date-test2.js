(function () {
  "use strict";

  require('./date');

  var assert = require('assert')
    , pairs = [
      // 0 + epoch +- 1
      ["epoch_sec",  "1970-01-01T00:00:00Z", "1970-01-01T00:00:00+00:00"],
      ["epoch_min0", "1970-01-01T00:00Z",    "1970-01-01T00:00:00+00:00"],
      ["epoch_min1", "1970-01-01T00:00:00Z", "1970-01-01T00:00+00:00"],
      ["epoch_+1m",  "1970-01-01T00:00Z",    "1970-01-01T00:01+00:01"],
      ["epoch_-1m",  "1970-01-01T00:00Z",    "1969-12-31T23:59-00:01"],
      ["epoch_+1h",  "1970-01-01T00:00:00Z", "1970-01-01T01:00:00+01:00"],
      ["epoch_-1h",  "1970-01-01T00:00:00Z", "1969-12-31T23:00:00-01:00"],

      // 1 +- epoch + 0
      ["1h-epoch",   "1969-12-31T23:00Z",    "1970-01-01T00:00+01:00"],
      ["1h+epoch",   "1970-01-01T01:00:00Z", "1970-01-01T00:00:00-01:00"],
      ["1m-epoch",   "1969-12-31T23:59:00Z", "1970-01-01T00:00+00:01"],
      ["1m+epoch",   "1970-01-01T00:01Z",    "1970-01-01T00:00:00-00:01"],


      ["+00:00", "2011-03-30T16:48:15Z", "2011-03-30T16:48:15+00:00"],
      ["-01:00", "2011-03-30T17:48:15Z", "2011-03-30T16:48:15-01:00"],
      ["+01:00", "2011-03-30T15:48:15Z", "2011-03-30T16:48:15+01:00"],
      ["-11:11", "2011-03-30T16:48:15Z", "2011-03-30T05:37:15-11:11"],
      ["+11:11", "2011-03-30T05:37:15Z", "2011-03-30T16:48:15+11:11"],

      // across dateline
      ["-11:00", "2011-04-01T03:00:01Z", "2011-03-31T16:00:01-11:00"],
      ["+11:00", "2011-03-31T18:00:01Z", "2011-04-01T05:00:01+11:00"],
    ];

  pairs.forEach(function (pair) {
    var date1 = pair[1]
      , date2 = pair[2];

    //console.log(pair[0]);
    assert.equal(Date.ISO(date1).toString(), Date.ISO(date2).toString());
    //assert.equal(Date.ISO(date1).valueOf(), Date.ISO(date2).valueOf());
  });
  console.log("datline tests passed");
}());
