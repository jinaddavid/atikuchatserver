////alert("h");
var iosocket, recid, recieving = "false";
var user_details;
var doctorlist, caller;
var reject;
var data, loca;
var personal;
var calltype;
var user_id;
var recordState = function(state) {
    window.localStorage.setItem("loca", state);
};

var getState = function() {
    return window.localStorage.getItem("loca");
};

var gotoLocation = function(addr) {
    window.location = addr;
};

var conThread = function() {
//    temp = window.localStorage.getItem("medslat_user_details");
//    user_details = JSON.parse(temp);
//    //alert(loca);

//    if (user_details === null) {
////        loca = "login";
//        gotoLocation("login.html");
//    } else {
////        loca = getState();
//    }

    iosocket = io.connect('http://localhost:3001');
    personal = "test@name.com";
    user_id = "1";
//    
//    em=personal;
//    //alert(personal);
    iosocket.on("connect", function(){
//     iosocket.emit("register", recid);
     iosocket.emit("register", user_id);
            window.localStorage.setItem("my_id", user_id);
    });

    iosocket.on("callFailed", function(data) {
        //alert("Call Failed!");
        $("body").load("chat.html");
    });

    iosocket.on("videoRequestFailed", function(data) {
        //alert("Call Failed!");
//        window.location = "chat.html";
        $("body").load("chat.html");
    });
    iosocket.on("audioRequestFailed", function(data) {
        //alert("Call Failed!");
//        window.location = "chat.html";
        $("body").load("chat.html");
    });



    iosocket.on("call_ended_by_caller", function(name) {
        //alert("call ended");
//        iosocket.emit("call_finished", mi);
        $("body").load("recent.html");
    });



    iosocket.on("videoRequestMobile", function(data) {
        window.localStorage.setItem("in_video_id", data.from);
        window.localStorage.setItem("in_video_un", data.user1un);
//        window.location = "vid_in.html";
        $("body").load("vid_in.html");
    });
    
    iosocket.on("audioRequestMobile", function(data) {
        //alert("incomming audio");
        window.localStorage.setItem("in_audio_id", data.from);
        window.localStorage.setItem("in_audio_un", data.user1un);
//        window.location = "vid_in.html";
        $("body").load("audio_in.html");
    });

    iosocket.on("vid_accepted", function(data_key) {
//        //alert("data_key");
        //alert(data_key);
        window.localStorage.setItem("call_key", data_key);
        $("body").load("talk.html");
//        window.location = "";
// $("body").load("http://localhost/mcr/vid?key=" + data_key);
    });
    
    iosocket.on("audio_accepted", function(data_key) {
//        //alert("data_key");
        //alert(data_key);
        window.localStorage.setItem("call_key", data_key);
        $("body").load("talk_audio.html");
//        window.location = "";
// $("body").load("http://localhost/mcr/vid?key=" + data_key);
    });

    iosocket.on("video_rej", function(data_key) {
        //alert("video rejected");

//        window.location = "recent.html";
        $("body").load("recent.html");

    });

    iosocket.on("vid_rejected", function(data) {

//        window.location = "recent.html";
        $("body").load("recent.html");
    });
    iosocket.on("audio_rejected", function(data) {

//        window.location = "recent.html";
        $("body").load("recent.html");
    });

    iosocket.on("note", function(data) {
//        //alert(data);
//      var user = new User(socket);
console.log("here ooo"+data);
    });

    iosocket.on("mobile_con_success", function(data) {
        if (loca === "recent") {
//            $.post("http://localhost/medslat/mobile/history", {mobile: true, id: recid},
//            function(dee) {
//                data = dee;
//                var lupus = JSON.parse(data);
//                $.each(lupus, function(key, data) {
//                    console.log(key);
//                    console.log(data);
//                    $.post("http://localhost/medslat/mobile/uname2id", {username: key},
//                    function(dee) {
////                    
////                <span class="photo">
////                    <img class="img-circle img-rounded rec_dp" src="images/mem2.jpg" alt="avatar"></img>
////                </span>
////
////                <div style="margin-left: 50px;width: 90%;">
////                    <div class="subject">
////                        <span class="from">jay</span>
////                        <span class="time">40 minutes ago</span>
////                    </div>
////                    <div class="message">
////                        xuppppppppppp htty sdfr rtt rt rtyrty ytrtyr
////                    </div>
////                </div>
////            </jj>
////        </div>
//                        toadd = "<div class='history_item' rel='" + dee + "' rel_user='" + key + "'><jj href='#'><span class='photo'><img class='img-circle img-rounded rec_dp' alt='avatar' src='assets/img/ui-zac.jpg'></span>\n\
//<div style='margin-left: 50px;width: 90%;'><div class='subject'>\n\
//<span class='from'>" + key + "</span>\n\
//<span class='time'>" + data[0]["time"] + "</span>\n\
//</span>\n\
//<div class='message'> " + data[0]["message"] +
//                                "   </div></jj> </div>   ";
//                        //alert(toadd);
//                        $('#home').append($(toadd));
//                    });
//                });
//            });
        }

        else if (loca === "chat") {
//            var doc = window.localStorage.getItem("chat_with");
////            //alert(doc);
//
//            var myself = user_details.tu;
//
////            var doc = window.m.getDoc();
////            var myself = window.m.testB();
//            $.post("http://localhost/medslat/mobile/uname2id", {username: myself},
//            function(data_myself)
//            {
//                //                    //alert(data_myself);
//                var recid_myself = data_myself;
//                //            //alert("history  ");
//                $.post("http://localhost/medslat/mobile/xhrloadPrevMsg", {user1id: data_myself, user2id: doc}, function(resp) {
//                    history_each = resp;
//                    console.log(history_each);
//
//                    $.post("http://localhost/medslat/mobile/id2uname", {username: doc},
//                    function(username) {
//
//                        //                                $("#userhead").attr("ref",doc);
//                        $("#userhead").text(username);
//                    });
//                    var lupus = JSON.parse(history_each);
//                    $.each(lupus, function(doc, data) {
//                        console.log(data);
//
//                        var me = parseInt(recid_myself);
//                        var you = parseInt(doc);
//
//                        var user1 = parseInt(data.user1id);
//                        var user2 = parseInt(data.user2id);
//
//                        if (me == user1 || you == user2) {
//
//                            $('.chat_board').append($("<div class='bubble_row'><div class=' outgoing_bubble  callout'>" + data.message + "</div> </div>"));
//
//                        }
//                        else {
//                            $('.chat_board').append($("<div class='bubble_row'><div class=' incomming_bubble  callout'>" + data.message + "</div></div>"));
//                        }
//
////                        var wtf = $('.chat_board');
////                        var height = wtf[0].scrollHeight;
////                        wtf.scrollTop(height);
////
//                    });
//                });
//            });

        }
    });

    iosocket.on('text', function(data) {
        $('#chat').prepend($('<p>').text(data.username + ': ' + data.text));
    });

    iosocket.on('message', function(message) {
        //alert("u av a new message");
        var test = window.localStorage.getItem("chat_with");
        if (test == message.user1id) {
            $('.new_chat_board').append($("<div class='bubble'><p>" + message.message + "</p><span style='float: right'></span> </div>"));
            var wtf = $('#my_chat_body');
            var height = wtf[0].scrollHeight;
            wtf.scrollTop(height);
        }
//                if (test != message.user2un) {
//                     if ($("#mspn_ph").val() == "") {
//                     } else {
//                         if (test !== message.user1un) {
//                             var prev_notf = Number($("#mspn_ph").val());
//                            $("#mspn").text(prev_notf + 1);
//                            $("#mspn_ph").val(prev_notf + 1);
//                            last_sender = message.user1un;
//                        }
//
//                    }
// 
//                } else { 
//                }
    });

    iosocket.on("user_in", function(data) {
//        //alert(data);
        user = data;
        if (user.name === session_name) {
            return;
        }
        var row = '<div  class="contact" id="display_' + user.name + '" pingId="' + user.name + '">'
                + '<img src="' + user.dp + '" alt="" class="contact__photo" id="display_picture_' + user.name + '">'
                + '<span class="contact__name ' + user.name + '">' + user.name + '</span>'
                + ' <span class="contain_control">'
                + ' <img class="call_pin btn_control" pingId="' + user.name + '" src="./images/1.png"> '
                + ' <img class="vid_pin btn_control"  pingId="' + user.name + '" src="./images/2.png"> '
                + '</span>'
                + '</div>';
        $(".contact_list").prepend(row);
//        console.log(data);
//      var user = new User(socket);
    });

    iosocket.on("wentOffline", function(name) {
        $("#display_" + name).slideUp("slow");
    });

    iosocket.on("call_ended", function(name) {
//         //alert("U ended call to "+name);
        iosocket.emit("call_finished", mi);
//        $("#display_" + name).slideUp("slow");
    });


    iosocket.on("missed_call", function(name) {
//         //alert("missed call from "+name);
        page = "contacts";
        getMi(page);
        iosocket.emit("call_finished", mi);
//        $("#display_" + name).slideUp("slow");
    });

    iosocket.on("audio_call_accepted", function(name) {
//        //alert("in call  " + name);

//        con.emit("call_finished", mi);
//        $("#display_" + name).slideUp("slow");
    });

    iosocket.on("audio_call_rejected", function(name) {
//        $("#outgoing_overlay").hide();
//        $(".reciever_name").html(callrcvr);
//        $(".reciever_dp").attr("src", pix);
//        //alert("")
        page = "contacts";
        getMi(page);
//        $(".app_display").append($("#contacts_sect").html());
//        $(".app_display").slideDown("slow");
        //alert(name + " rejected ur call");
        iosocket.emit("call_finished", mi);
//        con.emit("call_finished", mi);
//        $("#display_" + name).slideUp("slow");
    });

    iosocket.on("start_audio_call", function(name) {
//        //alert("in call  " + name);
//           $(".app_display").load("http://localhost/Qtalk/talk.php");
//   window.location="http://192.168.1.4/Qtalk/talk.php";
        page = "talk";
        getMi(page);
//        con.emit("call_finished", mi);
//        $("#display_" + name).slideUp("slow");
    });

//audio_call_rejected
};
conThread();

//============================== Click Events===============================================

$(document).on('click', ".history_item", function() {
//    loca = "chat";
    var loc = $(this).attr("rel");
    var loc_user = $(this).attr("rel_user");
//    //alert(loc);
//    //alert(loc_user);
//    window.m.chatWith(loc);
    window.localStorage.setItem("chat_with", loc);
    window.localStorage.setItem("chat_with_username", loc_user);
//    window.location = "chat.html";
    $("body").empty();
    $("body").load("chat.html");
});

$(document).on('touchstart', ".reciever_dp", function() {
//    loca = "profile";

    $("body").load("profile.html");
});

$(document).on("touchstart", ".back_btn_recent", function(e) {

//    $("body").empty();
//        ("hMenu.html");
//    //alert(count("<body>"));
    $("body").load("hMenu.html");
//    location.reload();
});
$(document).on("touchstart", ".back_btn_chat", function(e) {

    $("body").load("recent.html");
});

$(document).on('touchstart', ".my_profile_home", function() {
//    loca = "my_profile";

    $("body").load("my_profile.html");
});



$(document).on('touchstart', ".audio_call", function() {
//    loca = "my_profile";
    $("body").empty();
    calltype="audio";
 $("body").load("vid_out.html");
    


});

$(document).on('touchstart', ".video_call", function() {
//    loca = "my_profile";
//    //alert("video");
calltype="video";
    $("body").empty();
    $("body").load("vid_out.html");
});
