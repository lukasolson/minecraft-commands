(function () {
	var elements = Array.prototype.slice.call(document.querySelectorAll("div"));
	elements.forEach(function (element) {
		var copyFn = _.partial(copyToClipboard, element.children[0].dataset.command);
		var acknowledgeFn = _.partial(acknowledge, element);
		element.addEventListener("click", _.flow(copyFn, acknowledgeFn));
	});
	
	function copyToClipboard(text) {
		var div = document.createElement("div");
		div.innerHTML = text;
		document.body.appendChild(div);
		
		window.getSelection().removeAllRanges();
		var range = document.createRange();
		range.selectNode(div);
		window.getSelection().addRange(range);
		
		try {
			var msg = document.execCommand("copy");
		} catch (e) {
			console.log(e);
		}
		
		window.getSelection().removeAllRanges();
		document.body.removeChild(div);
	}
	
	function acknowledge(element) {
		element.className = "acknowledged";
		_.delay(function () {
			element.className = "";
		}, 100);
	}
})();