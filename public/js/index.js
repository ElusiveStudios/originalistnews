// (C)2020 Originalist Media
APICall('articles');
APICall('page-logo');
APICall('page-background');
APICall('navigations');
APICall('footer');

function APICall(endpoint) {
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		type: "get",
		url: "/" + endpoint
	});
	request.done(function(response,
		textStatus, jqXHR) {
		console.log(response);
		loadPage(endpoint, response);
	});
}

function loadPage(endpoint, response) {
	switch (endpoint) {
		case "articles":
			for (x = 0; x < response.length; x++) {
				var t = response[x].Body.split("|");
				var endText = t[0];
				for (y = 1; y < t.length; y++) {
					if (y > 0 && y % 2 !== 0) {
						endText += `<a href="${t[y]}">${t[y]}</a>`;
					} else {
						endText += t[y];
					}
				}
				var finalHTML =`<div class="article">
									<h2>${response[x].Title}</h2>
									<hr class="header-separator">
									<div class="article-body">
										<p>${endText}</p>`;
				try {
					finalHTML += `<img style="display:block;margin:auto;" src="${response[x].Image[0].url}" alt="Placeholder for now"/>`;
				} catch (e) {
					//Nothing to do here, no images included
				}
				finalHTML += `</div></div>`;
				$('.articles-container').prepend(finalHTML);
			}
			break;
		case "page-logo":
			$('header').append(`<img class="banner" src="${response.Image[0].url}" alt="Truth in Media">`);
			break;
		case "page-background":
			$('#body').prepend(`<img id="background" style="background-image:${response.Image[0].url}">`);
			break;
		case "navigations":
			var t = `<ul>`;
			var seq = 1;
			for (i = 0; i < response.length; i++) {
				if (response[i].Order == seq) {
					t += `<li><a href="$[response[i].URL}">${response[i].Name}</a></li>`;
					seq++;
				}
			}
			$('nav').html(t);
			break;
		case "footer":
			var t = `&copy; 2020 Originialist Media Corp.`;
			$('footer').html(t);
			break;
		default: break;
	}
}