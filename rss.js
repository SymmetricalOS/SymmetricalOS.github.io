function wrapHtml(input, wrapper, extra = "") {
	return "<" + wrapper + extra + ">" + input + "</" + wrapper + ">";
}

var reqURL =
	"https://api.rss2json.com/v1/api.json?rss_url=" +
	encodeURIComponent("https://symmetricalos.github.io/feeds/rss.xml");

$.getJSON(reqURL, function (rss) {
	var buffer = "";
	buffer = buffer + wrapHtml(rss.feed.title, "h1");
	const items = rss.items;

	console.log(rss);

	for (const item of items) {
		var title = wrapHtml(item.title, "h2");
		var content = wrapHtml(item.content, "p");
		var sub = wrapHtml(
			"Published by " + item.author + " on " + item.pubDate,
			"small"
		);
		buffer = buffer + wrapHtml(title + content + sub, "div");
	}
	document.getElementById("news2").innerHTML = buffer;
});
