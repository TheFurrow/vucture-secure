var selectedImages = [];

$(document).ready(function () {
    $('#summernote').summernote({
        height: 500,
        focus:true
    });

    $("#btn-submit").on('click', function () {

 
        var file = $('#banner-input')[0].files[0];

        var data = {
            heading: $('#heading').val(),
            text: $('#summernote').summernote('code'),
            publish: true
        }

        var formData = new FormData();
        formData.append("bannerImage", file);
        formData.append('entry', JSON.stringify(data));

        //console.log(data);

        $.ajax({
            type: "POST",
            url: '/post-new-entry',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            statusCode: {
                200: success,
                500: failure
            }
        });
    });
    $("#btn-update").on('click', function () {

        var data = {
            id: $('#entry-id').attr('data-entry-id'),
            heading: $('#heading').val(),
            text: $('#summernote').summernote('code'),
            publish: true
        }

        console.log(data);
        
        $.ajax({
            type: "POST",
            url: '/post-update-entry',
            data: data,
            statusCode: {
                200: success,
                500: failure
            }
        });
    });

    $("#btn-save").on('click', function () {

        var file = $('#banner-input')[0].files[0];

        var data = {
            heading: $('#heading').val(),
            text: $('#summernote').summernote('code'),
            publish: true
        }

        var formData = new FormData();
        formData.append("bannerImage", file);
        formData.append('entry', JSON.stringify(data));

        $.ajax({
            type: "POST",
            url: '/post-new-entry',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            statusCode: {
                200: success,
                500: failure
            }
        });
    });

    $("#btn-save-update").on('click', function () {

        var data = {
            id: $('#entry-id').attr('data-entry-id'),
            heading: $('#heading').val(),
            text: $('#summernote').summernote('code'),
            publish: false
        }

        console.log(data);

        $.ajax({
            type: "POST",
            url: '/post-update-entry',
            data: data,
            statusCode: {
                200: success,
                500: failure
            }
        });
    });

    function success(data) {
        window.location.href = "/cp/success";
    }

    function failure(data) {
        window.location.href = "/cp/failure";
    }

    function SetImages(rows) {

        $('#image-browser-modal .modal-body').empty();

        if (rows.length > 0) {
            for (var i = 0; i < rows.length; i++) {
                $('#image-browser-modal .modal-body').append('<img src="' + rows[i].path + '" width="150px" alt="'+rows[i].path+'"></img>');
            }
        }
        else {
            $('#image-browser-modal .modal-body').append('<p style="color:red">Empty database. Please add new images</p>');
        }
    }

    function ImageFails(data) {
        $('#image-browser-modal .modal-body').empty();
        $('#image-browser-modal .modal-body').append('<p style="color:red">' + JSON.stringify(data) + '</p>');
    }

    $('#image-browser-modal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus');

        $.ajax({
            type: "POST",
            url: '/post-get-all-images',
            statusCode: {
                200: SetImages,
                400: ImageFails
            }
        });
    })
})

