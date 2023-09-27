function wrapHtml(input, wrapper, extra="") {
    return "<" + wrapper + extra + ">" + input + "</" + wrapper + ">";
}

async function rssToJson(feedLink) {
	var d;

	var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(feedLink);

	$.getJSON(reqURL,
							function (data) {
								
								d = data;
							}
						);

	return d;
}

var rss = rssToJson("https://symmetricalos.github.io/feeds/rss.xml");
console.log(rss);

var buffer = "";
buffer = buffer + wrapHtml(rss.title, "h1");
const items = rss.items;

console.log(typeof(items));

for (const item of items) {
    var title = wrapHtml(item.title, "h2");
    var content = wrapHtml(item.content_html, "p");
    var sub = wrapHtml("Published by " + item.author.name, "small");
    buffer = buffer + wrapHtml(title + content + sub, "div");
}
document.write(buffer);
