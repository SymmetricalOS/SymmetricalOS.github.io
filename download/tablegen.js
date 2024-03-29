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

    buffer = buffer + wrapHtml(wrapHtml("Installer Version", "th") + wrapHtml("Kernel", "th") + wrapHtml("SymmOS Version", "th") + wrapHtml("File Size", "th") + wrapHtml("SHA-1 hash", "th") + wrapHtml("MD5 hash", "th") + wrapHtml("Download", "th"), "tr");

		console.log(json);

		for (const item of items) {
      		var version = wrapHtml(item.version, "td");
			var kernel = wrapHtml(item.kernel, "td");
			var symmos = wrapHtml(item.symmosver, "td");
			var size = wrapHtml(item.size, "td");
			var sha = wrapHtml(item.sha1, "td");
      var md5sum = wrapHtml(item.md5, "td");
			var file = "";
			if (item.file != "") {
				file += wrapHtml("File", "a", " href=" + item.file);
			}
			if (item.torrent != "") {
				if (file != "") {
					file += " ";
				}
				file += wrapHtml("Torrent", "a", " href=" + item.torrent);
			}
			file = wrapHtml(file, "td");
			buffer = buffer + wrapHtml(version + kernel + symmos + size + sha + md5sum + file, "tr");
		}
		document.getElementById("vertable").innerHTML = buffer;
	}
})
