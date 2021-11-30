(function ($) {
    let saerchForm = $('#searchForm');
    let searchTerm = $('#search_term');
    let showList = $('#showList');
    let showDetail = $('#show');
    let homeLink = $('#homeLink');
    let errorMessage = $('#errorMessage');

    $.ajax({
        type: 'get',
        url: "http://api.tvmaze.com/shows",
        // contentType: 'application/json',
        success: function (res) {
            let dataLen = res.length;
            let listData = $(res);
            if (dataLen > 0) {
                showList.show();
                homeLink.hide();
                showDetail.hide();
                errorMessage.hide();
            } else {
                errorMessage.show();
                errorMessage.html("There are no results for research");
                showList.hide();
                homeLink.hide();
                showDetail.hide();
            }

            for (let item of listData) {
                showList.append("<li><a href=" + item._links.self.href + ">" + item.name + "</a></li>");
            }
        }
    });

    saerchForm.submit(function (event) {
        event.preventDefault();
        let searchText = searchTerm.val();
        if (!searchText || searchText.trim() === "") {
            errorMessage.show();
            errorMessage.html("Please input valid value for research");
            searchTerm.empty();
            searchTerm.focus();
        } else {
            showList.empty();
            let searchUrl = "http://api.tvmaze.com/search/shows?q=" + searchText;
            $.ajax({
                type: 'get',
                url: searchUrl,
                success: function (res) {
                    let listData = $(res);
                    let dataLen = res.length;
                    if (dataLen > 0) {
                        showList.show();
                        homeLink.hide();
                        showDetail.hide();
                        errorMessage.hide();
                    } else {
                        errorMessage.show();
                        errorMessage.html("There are no results for research");
                        showList.hide();
                        homeLink.hide();
                        showDetail.hide();
                    }

                    for (let item of listData) {
                        let temp = item.show;
                        showList.append("<li><a href=" + temp._links.self.href + ">" + temp.name + "</a></li>");
                    }
                }
            });
        }
    });

    showList.on('click', 'a', function (event) {
        event.preventDefault();
        showList.hide();
        showDetail.empty();
        showDetail.show();
        homeLink.show();
        errorMessage.hide();

        $.ajax({
            type: 'get',
            url: $(this).attr("href"),
            success: function (res) {
                let showData = $(res)[0];
                console.log(showData);
                let showName = showData.name === null ? "N/A" : showData.name;
                let language = showData.language === null ? "N/A" : showData.language;
                let genres = showData.genres === null ? "N/A" : showData.genres;
                let average_rating = showData.rating.average === null ? "N/A" : showData.rating.average;
                let network = showData.network === null ? "N/A" : showData.network.name;
                let summary = showData.summary === null ? "N/A" : showData.summary;
                let imagePath = showData.image === null ? "public/no_image.jpeg" : showData.image.medium;

                showDetail.append('<h1>' + showName + '</h1>');
                showDetail.append('<img src="' + imagePath + '" alt= "' + showName + '"/>');
                // dl layout
                showDetail.append(`<dl id="showProperties"></dl>`);
                let showProperties = $('#showProperties');
                showProperties.append('<dt>Language </dt>');
                showProperties.append('<dd>' + language + '</dd>');
                showProperties.append('<dt>Genres </dt>');
                showProperties.append('<dd><ul id="genresList"></ul></dd>');
                if (genres === "N/A") {
                    $('#genresList').append('<li>' + genres + '</li>');
                } else {
                    for (let item of genres) {
                        $('#genresList').append('<li>' + item + '</li>');
                    }
                }
                showProperties.append('<dt>Average Rating </dt>');
				showProperties.append('<dd>' + average_rating + '</dd>');
				showProperties.append('<dt>Network: </dt>');
				showProperties.append('<dd>' + network + '</dd>');
				showProperties.append('<dt>Summary </dt>');
				showProperties.append('<dd>' + summary + '</dd>');
            }
        })
    });
})(window.jQuery);