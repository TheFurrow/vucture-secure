$(document).ready(function () {
    $('#image-input').change(function () {

        var formData = new FormData();
        formData.append("entryImage", this.files[0]);

        $.ajax({
            type: "POST",
            url: '/post-entry-image',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            statusCode: {
                200: success,
                400: failure
            }
        });

        $(this).val('');
    })


});

function success(data) {
    console.log(data);
    $('#sent-images').append('<img style="width:100px" src="' + data.webPath + '" alt="' + data.webPath + '"></img>');
}

function failure(data) {
    console.log(data);
}
$("body").on('click', 'img', function () {
    copyToClipboard(this.alt);
})


function copyToClipboard(value) {
    var success = true,
        range = document.createRange(),
        selection;

    // For IE.
    if (window.clipboardData) {
        window.clipboardData.setData("Text", value);
    } else {
        // Create a temporary element off screen.
        var tmpElem = $('<div>');
        tmpElem.css({
            position: "absolute",
            left: "-1000px",
            top: "-1000px",
        });
        // Add the input value to the temp element.
        tmpElem.text(value);
        $("body").append(tmpElem);
        // Select temp element.
        range.selectNodeContents(tmpElem.get(0));
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // Lets copy.
        try {
            success = document.execCommand("copy", false, null);
        }
        catch (e) {
            console.log("Use ctrl c + ctrl v");
        }
        if (success) {
            alert("Url copied to clipboard");
            // remove temp element.
            tmpElem.remove();
        }
    }
}

