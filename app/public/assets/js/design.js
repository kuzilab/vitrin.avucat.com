/////////////////////////

var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
}


////////////////////////


$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
/////////////////////////
$(document).ready(function () {
    $('.selectpicker').selectpicker();
    var searchFormIl = "select#searchBuroFormIl, select#searchAvukatFormIl",
        searchFormIlce = "select#searchBuroFormIlce, select#searchAvukatFormIlce",
        ilBolgeData = false,
        ilIlceData = false;

    if (ilBolgeData) {
        eachIlBolge(ilBolgeData);
    } else {
        $.getJSON("../assets/json/il-bolge.json", function (sonuc) {
            ilBolgeData = sonuc;
            eachIlBolge(ilBolgeData);
        });
    }

    function eachIlBolge(data) {
        $(document).find(searchFormIl).html('');
        $(document).find(searchFormIl).append('<optgroup label="TÜRKİYE"></optgroup>');
        $.each(data, function (index, value) {
            var iller = "";
            //iller +='<option value="'+value.il+'" title="'+value.il+'" data-plaka="'+value.plaka+'" data-subtext="'+value.bolge+'" data-bolge="'+value.bolge+'" >'+value.plaka+' - '+value.il+'</option>';
            iller += '<option ng-value="' + value.il + '"  value="' + value.il + '" title="' + value.il + '" data-plaka="' + value.plaka + '" data-bolge="' + value.bolge + '" >' + value.il + '</option>';
            $(document).find(searchFormIl + " optgroup").append(iller);
        });
        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 10);
        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 100);
    }
    $(document).on('change input', searchFormIl, function () {
        var t = $(this),
            selectFormIl = t.find('option:selected'),
            selectFormIlname = selectFormIl.attr('value'),
            selectFormIlbolge = selectFormIl.attr('data-bolge'),
            selectFormIlplaka = selectFormIl.attr('data-plaka');


        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 10);


        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 100);

        if (ilIlceData) {
            eachIlIlce(ilIlceData);
        } else {
            $(document).find(searchFormIlce).html('');
            $(document).find(searchFormIlce).append('<option disabled>YÜKLENİYOR...</option>');
            setTimeout(function () {
                $('.selectpicker').selectpicker('refresh');
            }, 2);
            $.getJSON("../assets/json/il-ilce.json", function (sonuc) {
                ilIlceData = sonuc;
                eachIlIlce(sonuc);
            });
        }

        function eachIlIlce(data) {

            setTimeout(function () {
                $('.selectpicker').selectpicker('refresh');
            }, 10);

            $(document).find(searchFormIlce).html('');
            $(document).find(searchFormIlce).append('<optgroup label="' + selectFormIlname + '"></optgroup>');
            $.each(data, function (index, value) {
                if (value.il == selectFormIlname) {
                    var ilceler = "";
                    ilceler += '<option ng-value="' + value.ilce + '" value="' + value.ilce + '" data-il="' + value.il + '" data-plaka="' + value.plaka + '"  data-bolge="' + value.bolge + '" >' + value.ilce + '</option>';
                    $(document).find(searchFormIlce + ' optgroup').append(ilceler);
                }
            });
        }


        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 10);


        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 100);
    });
});
/////////////////////////
jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() < 180) {
        $('header nav.fixed-top.in-intro').addClass('intro').removeClass('like-intro').css('position', 'absolute');
    } else {
        $('header nav.fixed-top.in-intro').removeClass('intro').addClass('like-intro').css('position', 'fixed');
    }
});
/////////////////////////
$(document).on('show.bs.tab', '#searchFormTab', function () {
    $('.searchForm')[0].reset();
    setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');
    }, 100);
});
/////////////////////////
$(document).ready(function () {
    $('body').addClass('ready');
});
/////////////////////////

if (isMobile) {
    $('.selectpicker').selectpicker('mobile');
}

/////////////////////////

$(document).ready(function () {

    var clipboard = new ClipboardJS('.copy-clipboard');

    $(document).on('click', '.copy-clipboard', function (e) {
        e.preventDefault();
        var t = $(this);
        t.tooltip('hide').addClass('copied');
    });
    $(document).on('mouseleave mouseout', '.copy-clipboard.copied', function (e) {
        $(this).removeClass('copied');
    });

});
/*////////////////////////////*/


$(window).on('load', function () {
    var target = $(document).find(window.location.hash);
    if (target.length) {
        showTarget(target);
    }
});

function showTarget(target) {
    if (target.length) {
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 80
        }, 400);
    }
}


$(function () {
    $('a.smoothscroll[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length && !$('.copy-clipboard').is(event.target)) {
            showTarget(target);
        }
    });
});

///////////////////////////////////////////
$(document).ready(function () {
    $('#mainTable').DataTable();
    var mySlider = $("input.slider").bootstrapSlider({
        'tooltip': 'show',
        'tooltip_position': 'top'
    });

    $('#formYorumEkle').on('show.bs.collapse shown.bs.collapse', function () {});
});


////////////////////////////////////////////

$(document).ready(function () {
    var bd = '#searchMapWrapperRightSideBody',
        li = $(bd).find('li');
    li.on('click', function () {
        t = $(this);
        if (!t.hasClass('active')) {
            li.removeClass('active');
            t.addClass('active');
        }
    });
});

////////////////////////////////////////////

$(document).ready(function () {
    var sfm = '.searcFormMap',
        map = '#searchMapWrapperLeftSide';
    if (isMobile)
        $('body').addClass('mobile show-list');

    $(document).on('click', '#searchMapWrapperLeftSide', function () {
        if (!$('body').hasClass('show-mobile')) {
            $('body').removeClass('show-list');
            $('body').addClass('show-map');
        }
    });

    $(document).on('click', '#searchMapWrapperRightSide', function () {
        if (!$('body').hasClass('show-list')) {
            $('body').removeClass('show-map');
            $('body').addClass('show-list');
        }
    });

});

$(document).ready(function () {
    $(".slider").each(function () {
        $(this).on("slide", function (slideEvt) {
            $(this).parent().parent().find('.slider-currentVal').text(slideEvt.value);
        });
    });
});