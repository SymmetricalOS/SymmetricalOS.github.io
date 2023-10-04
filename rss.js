function wrapHtml(input, wrapper, extra = "") {
	return "<" + wrapper + extra + ">" + input + "</" + wrapper + ">";
}

var reqURL =
	"https://api.rss2json.com/v1/api.json?rss_url=" +
	encodeURIComponent("https://symmetricalos.github.io/feeds/rss.xml");

$.ajax({
	type: 'GET',
	url: reqURL,
            crossDomain: true,
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
		//buffer = buffer + wrapHtml(rss.feed.title, "h1")
		const items = rss.items;

		console.log(rss);

		for (const item of items) {
			if (item.link == "") {
				var title = wrapHtml(item.title, "h2", " title=\"" + item.guid + "\"");
			} else {
				var title = wrapHtml(wrapHtml(item.title, "h2"), "a", " href=\"" + item.link + "\"");
			}
			var content = wrapHtml(item.content, "p");
			var time = item.pubDate;
			var options = {
				year: 'numeric', month: 'numeric', day: 'numeric',
				hour: 'numeric', minute: 'numeric', second: 'numeric'
			};
			var formatter = new Intl.DateTimeFormat([], options);
			var localtime = formatter.format(new Date(new Date(time) - (new Date().getTimezoneOffset() * 1000 * 60)));
			var sub = wrapHtml(
				"Published by " + item.author + " on " + localtime + " local time",
				"small"
			);
			buffer = buffer + wrapHtml(title + content + sub, "div");
		}
		document.getElementById("news2").innerHTML = buffer;
	}
})
