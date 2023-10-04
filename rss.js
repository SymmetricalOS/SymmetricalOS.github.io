function wrapHtml(input, wrapper, extra = "") {
	return "<" + wrapper + extra + ">" + input + "</" + wrapper + ">";
}

var reqURL =
	"https://www.toptal.com/developers/feed2json/convert?url=" +
	encodeURIComponent("https://symmetricalos.github.io/feeds/rss.xml");

$.ajax({
	type: 'GET',
	url: reqURL,
	//jsonpCallback: 'jsonCallback',
	contentType: 'application/json',
	//async: false,
	//dataType: 'jsonp',

	//xhrFields: { 
	// for CORS?
	//  withCredentials: false
	//},
	success: function (rss) {
		var buffer = "";
		//buffer = buffer + wrapHtml(rss.title, "h1")
		const items = rss.items;

		console.log(rss);

		for (const item of items) {
			if (item.link == "") {
				var title = wrapHtml(item.title, "h2", " title=\"" + item.guid + "\"");
			} else {
				var title = wrapHtml(wrapHtml(item.title, "h2"), "a", " href=\"" + item.link + "\"");
			}
			var content = wrapHtml(item.content_html, "p");
			var sub = wrapHtml(
				"Published by " + item.author.name + " on " + item.date_published,
				"small"
			);
			buffer = buffer + wrapHtml(title + content + sub, "div");
		}
		document.getElementById("news2").innerHTML = buffer;
	}
})
