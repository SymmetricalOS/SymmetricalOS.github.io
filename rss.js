function wrapHtml(input, wrapper, extra = "") {
	return "<" + wrapper + extra + ">" + input + "</" + wrapper + ">";
}

$.ajax({
	type: 'GET',
	url: "feeds/rss.xml",
	crossDomain: true,
	dataType: 'XML',
	success: function (xml) {
		var x2js = new X2JS();
		var rss = x2js.xml2json(xml).rss.channel;
		var buffer = "";
		//buffer = buffer + wrapHtml(rss.feed.title, "h1")
		const items = rss.item;

		console.log(rss);

		for (const item of items) {
			if (item.link == "" || item.link == null) {
				var title = wrapHtml(item.title, "h2", " title=\"" + item.guid + "\"");
			} else {
				var title = wrapHtml(wrapHtml(item.title, "h2"), "a", " href=\"" + item.link + "\"");
			}
			var content = wrapHtml(item.description, "p");
			var time = item.pubDate.substring(0, item.pubDate.length - 4);
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
			buffer = buffer + wrapHtml(wrapHtml(item.title, "summary") + wrapHtml(title + content + sub, "div"), "details")
		}
		document.getElementById("news2").innerHTML = buffer;
	}
})
