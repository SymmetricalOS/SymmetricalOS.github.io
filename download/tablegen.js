function wrapHtml(input, wrapper, extra = "") {
	return "<" + wrapper + extra + ">" + input + "</" + wrapper + ">";
}

$.ajax({
	type: 'GET',
	url: "isodata.json",
	crossDomain: true,
	dataType: 'JSON',
	success: function (json) {
    //i know i'm lazy and stole this code from the rss reader
		var buffer = "";
		//buffer = buffer + wrapHtml(rss.feed.title, "h1")
		//const items = JSON.parse(json).info;
		const items = json.info

    buffer = buffer + wrapHtml(wrapHtml("Installer Version", "th") + wrapHtml("File Size", "th") + wrapHtml("SHA-256 hash", "th") + wrapHtml("MD5 hash", "th"), "tr");

		console.log(json);

		for (const item of items) {
      var version = wrapHtml(item.version, "th");
			var size = wrapHtml(item.size, "th");
			var sha = wrapHtml(item.sha1, "th");
      var md5sum = wrapHtml(item.md5sum, "th");
			buffer = buffer + wrapHtml(title + content + sub, "tr");
		}
		document.getElementById("stuffs").innerHTML = buffer;
	}
})
