require('es6-promise').polyfill();
require('isomorphic-fetch');
var qs = require('qs');
var axios=require('axios');
var app = require("express")();
var mysql = require("mysql");
var http = require("http").Server(app);
var reqHandler = require('http');
var request = require('request');
var io = require("socket.io")(http);
var async = require("async");
var allusers = {};
var alladmin = {};
var allusers_token = {};
var allusers_token_UID = {};
var cons = [];
var allUsersId = [];
var newUserNotify = [];
var rec_id, x, y;
var all_admin_id = [];
var port = process.env.PORT || 8080;
// var APIURL="http://localhost/atikuApi/";
 var APIURL="http://api.atikuvotersapp.org/";
//var pool = mysql.createPool({
//    connectionLimit: 100,
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    port: 3306,
//    database: 'atikuapp',
//    debug: false
//});



//                                           parent::__construct("mysql:host=us-cdbr-iron-east-05.cleardb.net;dbname=heroku_8191d8d312e7bb2", "bbd8ace6fe2865", "411c2f01");

//var pool = mysql.createPool({
////    connectionLimit: 100,
//    host: 'us-cdbr-iron-east-05.cleardb.net',
//    user: 'bbd8ace6fe2865',
//    password: '411c2f01',
//    database: 'heroku_8191d8d312e7bb2',
//    port: 3306,
//    debug: true,
//});
//pool.getConnection(function (err, connection) {
//    console.log(err + "-jjjj");
//    if (err) {
//        connection.release();
//
//        return;
//    }
//    console.log("connected succesfully")
//});


//pool.query("SELECT 'Hello, World!' AS hello", function(err, rows, fields) {
//  if(err) throw err;
//  console.log(rows[0].hello);
//});
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
function randomString() {
    var strChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var strRandomstring = '';
    for (var intCounterForLoop = 0; intCounterForLoop < 30; intCounterForLoop++) {
        var rnum = Math.floor(Math.random() * strChars.length);
        strRandomstring += strChars.substring(rnum, rnum + 1);
    }
    return strRandomstring;
}
io.on('connection', function (socket) {
    var uid, dat;

    console.log("user connected");

//to register new user on the server
    socket.on('register', function (id) {
        console.log("empty" + id);
//id="logintest";
        getUIDandtype(socket, id, function (err, data) {  // get the user id from table // passing the login token as a param
            console.log(data + "no do today forget tomorrow")
            if (err) {
                console.log("ERRORdav : ", err);
            } else {

                uid = data;   // this is the user id from db 
                dat = data;   // this is the user id from db 
//                uid = data[0].id;   // this is the user id from db 
//                dat = data[0].id;   // this is the user id from db 
//                var type=data[0].usertype;
//                if (type==="admin"){
//                    alladmin[dat] = socket;
//                }
                console.log("trying to registed " + data);
                console.log("trying to registed " + uid);
                cons.push(socket);
                allUsersId.push(uid);
                allusers[dat] = socket;
                allusers_token[dat] = id;
                allusers_token_UID[id] = dat;
                console.log(allusers_token);
                userList = Object.keys(allusers);
                allUsersId = userList;
                socket.emit("note", "welcome");
                socket.emit("note", "welcome");

                console.log("new user connected =     " + dat);
                console.log("all userallusers connected =     " + allusers[dat]);
                var size = Object.keys(alladmin).length;
//                console.log(size+"sade");
//                if (size > 0){
//                    console.log("all Admin connected =     " + alladmin);
//                }
//                else{
//                     console.log("No Admin Connected");
                fLen = all_admin_id.length;
                console.log(fLen + "admin size")
                for (i = 0; i < fLen; i++) {
                    console.log(all_admin_id[i] + "this is it")
                }


                async.each(cons, function (user) {
                    user.emit("users_update", allUsersId);
                }, function (err) {
                });
                console.log("result from db is : ", data);
            }

        });

    });




    socket.on("note", function (note) {
        console.log(note);
    });

    socket.on("msg_read", function (data) {
        console.log("update message");
        console.log(data);
        msg_read(data, function (res) {
            console.log("update" + res)
        });
    });

 

    socket.on('pm', function (info) {
        console.log("david here")
        var check = 'false';
        console.log(check + 'falseiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        if (check === 'true') {
            alert('trettsssssssssssssssssssssssssssss555555555555ssssssssssssssssssssssssssszzzzzzzzzzz')
            console.log(check);
            return;
        } else {


            console.log('txd3333rettsssssssssssssssssssss4444444444444444ssssssssssssssssssssssssssssssssssssssssssssss');
            console.log(check);
            console.log("message...");
            console.log(info);
            console.log(info.user2id);
//        var rec_id = convert2id(info.user2id);
//        var rec_id = con2id(info.user2id);
            con2id(info.user2id, function (res) {
                console.log("ijdddj" + res);
                rec_id = res;
                console.log(rec_id + "kkkkkkkkkkkkkllllllllllllllllllll")
//        var rec_id = info.user2id;

                var sen_id = 0;

                getToken("", rec_id, function (err, data) {      /// get the user login token from db using user id      
                    if (err) {
                        console.log("ERROR : ", err);
                    } else {
                        console.log('iias;' + rec_id);
                        getUID("", info.user1id, function (err, data2) { /// get the user id from db using user login token
                            if (err) {
                                console.log("ERROR : ", err);
                            } else {
                                console.log("receiver token: " + data + "sender id " + data2);
//                        console.log("recipient id ->" + generate_id(data2, data));
//                           checkadminid(data2, function(res) {
//            console.log("ijdddj" + res);
//             y=res;
//        });
//          checkadminid(rec_id, function(res) {
//            console.log("ijseconddddj" + res);
//            x=res;
//        });
//                            changeid(data2);
                                info['user1ida'] = data2;
                                console.log(data2 + "davdavdavdavdav")
//                        info['user1ida'] = dav;
                                info['user2ida'] = rec_id;
//                        info['user1ida'] = y;
//                        info['user2ida'] = x;
                                console.log(data2 + "xactly before safe :" + info.user1id);
                                add_status2(info, function (res) {
                                    console.log(res + "-cccc")
                                    if (res) {
                                        info["status"] = res.split(":")[0] + ":" + res.split(":")[1];
                                        console.log("sending message to---> " + info.user2id + ' time= ' + res);

                                        if (getMap(rec_id) == -1) {
                                            console.log("user not online");
                                            if (getMap(data2) == -1) {
                                                console.log("u self no dey  online");
                                            } else {
                                                console.log("seningg notificaTIONS");
                                                getMap(data2).emit("status_sent", info);
                                            }
                                        } else {
//                                    console.log("my recever " + generate_id(data2, getUseToken(rec_id)));
//                                    info['user1id'] = generate_id(data2, getUseToken(rec_id));
                                            console.log("my recever " + getUseToken(rec_id));
//                                    info['user1id'] = getUseToken(rec_id);
                                            console.log(info + "popoopopopopoopopopo");

                                            getMap(rec_id).emit("message", info);

                                            if (getMap(rec_id) == -1) {
                                                console.log("user not online");

                                            } else {
                                                if (getMap(data2) == -1) {
                                                    console.log("u self no dey  online");
                                                } else {
                                                    console.log("seningg notificaTIONS");
                                                    getMap(data2).emit("status_sent", info);
                                                }
                                                console.log("13/09/2019 ->" + getMap(rec_id));


                                            }
                                        }

                                    } else {
                                        io.emit('error');
                                    }
                                });

                            }
                        });

                    }
                });


                check = 'true';
            });

        }
    });

    socket.on('msgadmin', function (info) {
        console.log("david here")
        var check = 'false';
//         console.log(check+'falseiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        if (check === 'true') {
//            alert('trettsssssssssssssssssssssssssssss555555555555ssssssssssssssssssssssssssszzzzzzzzzzz')
            console.log(check);
            return;
        } else {


//   console.log('txd3333rettsssssssssssssssssssss4444444444444444ssssssssssssssssssssssssssssssssssssssssssssss');
            console.log(check);
            console.log("message...");
            console.log(info);
            console.log(info.user2id);
//        var rec_id = convert2id(info.user2id);
//        var rec_id = con2id(info.user2id);
            con2id(info.user2id, function (res) {
                console.log("ijdddj" + res);
                rec_id = res;

//            llllllllllllll


                console.log(rec_id + "kkkkkkkkkkkkkllllllllllllllllllll")
//        var rec_id = info.user2id;

                var sen_id = 0;

                getToken("", rec_id, function (err, data) {      /// get the user login token from db using user id       this time email  
                    if (err) {
                        console.log("ERROR : ", err);
                    } else {
                        console.log('iias;' + rec_id);
                        getUID("", info.user1id, function (err, data2) { /// get the user id from db using user login token
                            if (err) {
                                console.log("ERROR : ", err);
                            } else {
                                console.log("receiver token:  get the user id from db using user login token" + data + "sender id " + data2);
//                        console.log("recipient id ->" + generate_id(data2, data));
//                           checkadminid(data2, function(res) {
//            console.log("ijdddj" + res);
//             y=res;
//        });
//          checkadminid(rec_id, function(res) {
//            console.log("ijseconddddj" + res);
//            x=res;
//        });
//                            changeid(data2);
                                info['user1ida'] = data2;
                                console.log(data2 + "davdavdavdavdav")
//                        info['user1ida'] = dav;
                                info['user2ida'] = rec_id;
//                        info['user1ida'] = y;
//                        info['user2ida'] = x;
                                console.log(data2 + "xactly before safe :" + info.user1id);
                                add_status(info, function (res) {
                                    console.log(res + "-cccc")
                                    if (res) {
                                        info["status"] = res.split(":")[0] + ":" + res.split(":")[1];
                                        console.log("sending message to---> " + info.user2id + ' time= ' + res);

                                        if (getMap(rec_id) == -1) {
                                            console.log("user not online" + rec_id);
                                            if (getMap(data2) == -1) {
                                                console.log("u self no dey  online");
                                            } else {
                                                console.log("seningg notificaTIONS");
                                                getMap(data2).emit("status_sent", info);
                                            }
                                        } else {
//                                    console.log("my recever " + generate_id(data2, getUseToken(rec_id)));
//                                    info['user1id'] = generate_id(data2, getUseToken(rec_id));
                                            console.log("my recever " + getUseToken(rec_id));
//                                    info['user1id'] = getUseToken(rec_id);
                                            console.log(info + "popoopopopopoopopopo");
                                            for (i = 0; i < fLen; i++) {
                                                  if (getMap(all_admin_id[i]) == -1) {
                                                console.log("Admin not online");

                                            }
                                                else{
                                                       console.log(all_admin_id[i] + "this is it")
                                                 getMap(all_admin_id[i]).emit("message", info);
                                                }
                                                
                                             
                                            }

                                            

                                            if (getMap(rec_id) == -1) {
                                                console.log("user not online");

                                            } else {
                                                if (getMap(data2) == -1) {
                                                    console.log("u self no dey  online");
                                                } else {
                                                    console.log("seningg notificaTIONS");
                                                    getMap(data2).emit("status_sent", info);
                                                }
                                                console.log("13/09/2019 ->" + getMap(rec_id));


                                            }
                                        }

                                    } else {
                                        io.emit('error');
                                    }
                                });

                            }
                        });

                    }
                });


//lllllllllllllllll
            });


            check = 'true';
        }
    });















    socket.on('askym', function (info) {
        console.log(info);
        add_status(info, function (res) {
            if (res) {
                console.log("sending message to " + info.user2id);
//            console.log(status);
                if (getMap(info.user2id) == -1) {
                    console.log("user not online");
                    if (getMap(info.user1id) == -1) {
                        console.log("u self no dey  online");
                    } else {
                        console.log("sending message to " + info.user2id);
                        getMap(info.user1id).emit("status_sent", info);
//                        return;
                    }
                } else {
                    getMap(info.user2id).emit("askymsg", info);
                    if (getMap(info.user1id) == -1) {
                        console.log("u self no dey  online");
                    } else {
                        getMap(info.user1id).emit("asky_sent", info);
                    }
                }
            } else {
                io.emit('error');
            }
        });
    });
    socket.on('resypm', function (info) {
        console.log(info);
        add_status(info, function (res) {
            if (res) {
                info[status] = res;
                console.log("sending message to---> " + info.user2id + ' time= ' + res);
//            console.log(status);
                if (getMap(info.user2id) == -1) {
                    console.log("user not online");
                    if (getMap(info.user1id) == -1) {
                        console.log("u self no dey  online");
                    } else {
                        console.log("sending message to " + info.user2id);
                        getMap(info.user1id).emit("resym_sent", info);
//                        return;
                    }
                } else {
                    getMap(info.user2id).emit("resypm", info);
                    if (getMap(info.user1id) == -1) {
                        console.log("u self no dey  online");
                    } else {
                        getMap(info.user1id).emit("resym_sent", info);
//                    return;
                    }
                }

            } else {
                io.emit('error');
            }
        });
    });

    socket.on('status_added', function (status) {

    });

    socket.on('disconnect', function () {
//        console.log('user disconnected id' + uid)
        console.log("user  " + uid + " went Offline");
        last_seen(uid, function (res) {
            console.log("last seen" + res);
        });
        delete allusers[uid];
        allUsersId.splice(allUsersId.indexOf(uid), 1);
        userList = Object.keys(allusers);
        allUsersId = userList;
        if (userList.length < 1) {
            console.log("EveryBody is Out")
        }
        async.each(cons, function (user) {
            user.emit("users_update", allUsersId);
        }, function (err) {
        });

    });



});












//inserts a message to the database from users
var add_status = function (status, callback) {
//    var user1id,user2id;
    console.log(status);
//    pool.getConnection(function (err, connection) {
//        console.log(err + "-jjjj");
//        if (err) {
//            connection.release();
//            callback(false);
//            return;
//        }

        message = status.message;
        user1id = status.user1ida;
//        user1id = status.admin_id;
//        user2id = status.user2ida;
        user2id = "0";
        status1 = status.status;
        var time1 = new Date();
        var goh = time1.getFullYear() + "-" + (time1.getMonth() + 1) + "-" + time1.getDate();
        console.log(" getting date  == " + goh);

        var time2 = new Date();
        var secon = time2.getHours() + ":" + time2.getMinutes() + ":" + time2.getSeconds();
        console.log(" getting time == " + secon);
        console.log(message + user1id + user2id + status);
        var getting_time = secon;
        
          axios.post(APIURL+'savechat',qs.stringify( {
    message: message,
    user1id: user1id,
    user2id: user2id,
    status1: status1,
    goh: goh, 
    secon: secon
  }))
  .then(function (response) {
   console.log(response+"res david")
     callback(secon);
  })
  .catch(function (error) {
   console.log(error)
  });
       
        
        
//        var query = "INSERT INTO `message_tbl` (`message`,`user1id`,`user2id`,`status`,`msg_date`,`msg_time`) VALUES ?";
//        var data = [
//            [message, user1id, user2id, status1, goh, secon]
//        ];
////        console.log("what to sfe " + data);
//        connection.query(query, [data], function (err, rows) {
//            connection.release();
//            if (!err) {
//                console.log("AKIN--->" + rows.id);
//                var msgString = JSON.stringify(status);
////                request.post(
////                        'http://localhost/medslat/mobile/puShMessage/',
////                        {form: status},
////                function(error, response, body) {
////                    if (!error && response.statusCode === 200) {
////                        console.log(body);
////
////                    }
////                }
////                );
//                callback(secon);
//            }
//
//        });
//        connection.on('error', function (err) {
//            callback(false);
//            return;
//        });
//    });
};
//inserts a message to the database for admin
var add_status2 = function (status, callback) {
//    var user1id,user2id;
    console.log(status);
//    pool.getConnection(function (err, connection) {
//        console.log(err + "-jjjj");
//        if (err) {
//            connection.release();
//            callback(false);
//            return;
//        }

        message = status.message;
//        user1id = status.user1ida;
        user1id = status.admin_id; 
        user2id = status.user2ida;
//        user2id = "0";
        status1 = status.status;
        var time1 = new Date();
        var goh = time1.getFullYear() + "-" + (time1.getMonth() + 1) + "-" + time1.getDate();
        console.log(" getting date  == " + goh);

        var time2 = new Date();
        var secon = time2.getHours() + ":" + time2.getMinutes() + ":" + time2.getSeconds();
        console.log(" getting time == " + secon);
        console.log(message + user1id + user2id + status);
        var getting_time = secon;
//        var params = new URLSearchParams();
//params.append('param1', 'value1');
//params.append('param2', 'value2');

//axios.post('/foo', qs.stringify({ 'bar': 123 });
        axios.post(APIURL+'savechat',qs.stringify( {
    message: message,
    user1id: user1id,
    user2id: user2id,
    status1: status1,
    goh: goh, 
    secon: secon
  }))
  .then(function (response) {
   console.log(response+"res david")
     callback(secon);
  })
  .catch(function (error) {
   console.log(error)
  });
        
        
        
        
        
        
        
        
//        var query = "INSERT INTO `message_tbl` (`message`,`user1id`,`user2id`,`status`,`msg_date`,`msg_time`) VALUES ?";
//        var data = [
//            [message, user1id, user2id, status1, goh, secon]
//        ];
////        console.log("what to sfe " + data);
//        connection.query(query, [data], function (err, rows) {
//            connection.release();
//            if (!err) {
//                console.log("AKIN--->" + rows.id);
//                var msgString = JSON.stringify(status);
////                request.post(
////                        'http://localhost/medslat/mobile/puShMessage/',
////                        {form: status},
////                function(error, response, body) {
////                    if (!error && response.statusCode === 200) {
////                        console.log(body);
////
////                    }
////                }
////                );
              
//            }

//        });
//        connection.on('error', function (err) {
//            callback(false);
//            return;
//        });
//    });
};



function getUID(username, roomCount, callback) {
//    getUseTokenUID 
    if (getUseTokenUID(roomCount) !== -1) {
        console.log("from inside get yuid");
        callback(null, getUseTokenUID(roomCount));
    } else {
                axios.get(APIURL+"getUIDandtype/"+roomCount)
        .then(function (response) {
            console.log(response.data.message)
                    if (response.data.status==="true"){
                            console.log("---->" + response.data.message[0].id);
                    var id = response.data.message[0].id;
                    var type = response.data.message[0].usertype;
                    console.log(type)
                  
                    callback(null, response.data.message[0].id); 
                    }
//            pokemonName.innerHTML = response.data.forms[0].name;
//            pokemonImage.src = response.data.sprites.front_default;
        })
        .catch(function (error) {
          console.log(error)
        });
    }


}

function getUIDandtype(username, roomCount, callback) {
//    getUseTokenUID 
    if (getUseTokenUID(roomCount) !== -1) {
        console.log("from inside get yuid");
        callback(null, getUseTokenUID(roomCount));
    } else {
        
//        fetch("http://localhost/atikuApi/getUIDandtype/"+roomCount) // Call the fetch function passing the url of the API as a parameter
////.then(function(data) {
//   .then(function(response) {
//        if (response.status >= 400) {
//            throw new Error("Bad response from server");
//        }
//       
////        return response.json();
//
//    })
//    .then(function(stories) {
////         var resp=response.json();
////        console.log(resp)
//        console.log(stories+"kkkkk");
//    });
//    
//    
      axios.get(APIURL+"getUIDandtype/"+roomCount)
        .then(function (response) {
            console.log(response.data.message)
                    if (response.data.status==="true"){
                            console.log("---->" + response.data.message[0].id);
                    var id = response.data.message[0].id;
                    var type = response.data.message[0].usertype;
                    console.log(type)
                    if (type === "admin") {
                        alladmin[id] = username;
                        all_admin_id[all_admin_id.length] = id;
                    }
                    callback(null, response.data.message[0].id); 
                    }
//            pokemonName.innerHTML = response.data.forms[0].name;
//            pokemonImage.src = response.data.sprites.front_default;
        })
        .catch(function (error) {
          console.log(error)
        });
// .then((resp) => resp.json())
        
//        console.log("get uid " + roomCount);
//        pool.getConnection(function (err, connection) {
//            if (err) {
//                connection.release();
//                callback(false);
//                return;
//            }
////            connection.query('SELECT id FROM users WHERE login_token = ?', [roomCount], function(err, result)
//            connection.query('SELECT * FROM users WHERE email = ?', [roomCount], function (err, result)
//            {
//                if (err)
//                    callback(err, null);
//                else
//                    console.log(result + "freeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
//                if (result.length !== 0) {
////                    console.log("---->" + result[0].id);
//                    var id = result[0].id;
//                    var type = result[0].usertype;
//                    if (type === "admin") {
//                        alladmin[id] = username;
//                        all_admin_id[all_admin_id.length] = id;
//                    }
//                    callback(null, result[0].id);
//                }
//
////                
//
//            });
//        });
    }


}



//update user last seen 
var last_seen = function (data, callback) {
    console.log("here");
    var a_p = "";
    var d = new Date();

    var curr_hour = d.getHours();

    if (curr_hour < 12)
    {
        a_p = "AM";
    } else
    {
        a_p = "PM";
    }
    if (curr_hour == 0)
    {
        curr_hour = 12;
    }
    if (curr_hour > 12)
    {
        curr_hour = curr_hour - 12;
    }

    var curr_min = d.getMinutes();

    var current_time = curr_hour + " : " + curr_min + " " + a_p;


    var m_names = new Array("January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December");

    var d = new Date();
    var curr_date = d.getDate();
    if (curr_date < 10) {
        curr_date = '0' + curr_date;
    }

    var curr_month = d.getMonth() + 1;
    if (curr_month < 10) {
        curr_month = '0' + curr_month;
    }

    var curr_year = d.getFullYear();
    if (curr_year < 10) {
        curr_year = '0' + curr_year;
    }
    var current_date = curr_date + "-" + curr_month + "-" + curr_year;
           axios.post(APIURL+'updatelastseen',qs.stringify( {
    current_date: current_date,
    current_time: current_time,
    data: data
  }))
  .then(function (response) {
   console.log(response+"kile kile")
//     callback(secon);
  })
  .catch(function (error) {
   console.log(error)
                return ;
  });
     

//    pool.getConnection(function (err, connection) {
//        if (err) {
//            console.log("error")
//            connection.release();
//            callback(false);
//            return;
//        }
////console.log("UPDATE `message_tbl` SET `status`=3 WHERE  (user1id='" + id1 + "' AND user2id='" + id2 + "') OR (user2id='" + id1 + "' AND user1id='" + id2 + "')");
//        connection.query("UPDATE `users` SET `last_date`='" + current_date + "',`last_time`='" + current_time + "' WHERE  id='" + data + "'"), function (err, rows) {
////           (user1id=:user1id AND user2id=:user2id) OR (user2id=:user1id AND user1id=:user2id)
////'" + id1 + "'
//            connection.release();
//
//        };
//        connection.on('error', function (err) {
//            callback(false);
//            return;
//        });
//    });
};
var con2id = function (email, callback) {
    console.log("here");
    console.log("here" + email);
    console.log("here");
     axios.get(APIURL+"getid/"+email)
        .then(function (response) {
            console.log(response.data.message)
                    if (response.data.status==="true"){
                            console.log("---->" + response.data.message);
//                    var id = response.data.message[0].id;
//                    var type = response.data.message[0].usertype;
//                    console.log(type)
//                    if (type === "admin") {
//                        alladmin[id] = username;
//                        all_admin_id[all_admin_id.length] = id;
//                    }
                    callback(response.data.message); 
                    }
 
        })
        .catch(function (error) {
          console.log(error)
        });
//    pool.getConnection(function (err, connection) {
//        if (err) {
//            connection.release();
//            callback(false);
//            return;
//        }
//        connection.query('SELECT id FROM users WHERE email = ?', [email], function (err, result)
//        {
//            if (err) {
//                callback(err, null);
//            } else {
//                console.log(result + "result dav");
//                if (result.length !== 0) {
//                    console.log("---->" + result[0].id);
//
//                    callback(result[0].id);
////                return result[0].id;
//                }
//
//            }
//
//        });
//    });


};


var dav;

// to check of a user is in the userlist (returns a value)
function getMap(k) {
//    console.log(allusers[k]);
//allusers[k];
    if (!allusers[k]) {
        console.log("map not found");
        return -1;
    } else {
//        console.log(allusers[k]);
        return allusers[k];
    }

}

function getUseToken(k) {
    if (!allusers_token[k]) {
        console.log("map not found");
        return -1;
    } else {
        return allusers_token[k];
    }

}

function getUseTokenUID(k) {
    if (!allusers_token_UID[k]) {
        console.log("map not found");
        return -1;
    } else {
        return allusers_token_UID[k];
    }

}


function picksub(str, start, end) {
    var tokenarray = str.split('');
    var uid = "";
    if (start === end) {
        return tokenarray[start];
    } else if (start < end) {
        for (var index = start; index <= end; index++) {
            uid += tokenarray[index];
        }
        return uid;
    } else {
        return uid;
    }
}

function generate_id(uid, token) {
    console.log("tokennnn " + token + " uid " + uid);
    var n_uid = "a" + uid;
    var id_count = n_uid.split('').length - 1;

    var pos = 0;
    switch (id_count) {
        case 1:
            pos = 31;
            break;
        case 2:
            pos = 32;
            break;
        case 3:
            pos = 33;
            break;
        case 4:
            pos = 34;
            break;
        case 5:
            pos = 21;
            break;
        case 6:
            pos = 22;
            break;
        case 7:
            pos = 23;
            break;
        case 8:
            pos = 24;
            break;
        case 9:
            pos = 11;
            break;
        case 10:
            pos = 12;
            break;
        case 11:
            pos = 13;
            break;
        case 12:
            pos = 14;
            break;
        default:
//                echo "!";
    }

    return putinplace(token, uid, pos);
}

function putinplace(str, insertstr, pos) {
    console.log("positoion :" + pos);
    return str.substr(0, pos) + insertstr + str.substr(pos);
}




function getToken(username, id, callback)
{

    if (getUseToken(id) !== -1) {
        console.log("from inside");
        callback(null, getUseToken(id));
    } else {
        console.log("from database");
        console.log("get token " + id);
        
          axios.get(APIURL+"getemail/"+id)
        .then(function (response) {
            console.log(response.data.message)
                    if (response.data.status==="true"){
                            console.log("---->" + response.data.message);
 var d = new Date();
                var curr_date = d.getDate();
                if (curr_date < 10) {
                    curr_date = '0' + curr_date;
                }

                var curr_month = d.getMonth() + 1;
                if (curr_month < 10) {
                    curr_month = '0' + curr_month;
                }

                var curr_year = d.getFullYear();
                if (curr_year < 10) {
                    curr_year = '0' + curr_year;
//                    }
                    callback(response.data.message); 
                    }
                    }
 
        })
        .catch(function (error) {
          console.log(error)
        });
        
        
        
        
        
        
        
//        pool.getConnection(function (err, connection) {
//            if (err) {
//                connection.release();
//                callback(false);
//                return;
//            }
//            connection.query('SELECT email FROM users WHERE id = ?', [id], function (err, result)
//            {
//                if (err)
//                    callback(err, null);
//                else
//                    console.log(result);
//                if (result.length !== 0) {
//                    console.log("---->" + result[0].login_token);
//                    callback(null, result[0].login_token);
//                }
//
////                
//                var d = new Date();
//                var curr_date = d.getDate();
//                if (curr_date < 10) {
//                    curr_date = '0' + curr_date;
//                }
//
//                var curr_month = d.getMonth() + 1;
//                if (curr_month < 10) {
//                    curr_month = '0' + curr_month;
//                }
//
//                var curr_year = d.getFullYear();
//                if (curr_year < 10) {
//                    curr_year = '0' + curr_year;
//                }
//            });
//        });
    }


}
//call Fn for db query with callback


//update message status as read
var msg_read = function (data, callback) {
    var rec_id = convert2id(data.user2id);
    var sen_id = 0;
    getUID("", data.user1id, function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        } else {
            pool.getConnection(function (err, connection) {
                if (err) {
                    connection.release();
                    callback(false);
                    return;
                }
                var id1 = data;
                var id2 = rec_id;
                connection.query("UPDATE `message_tbl` SET `status`=1 WHERE  (user1id='" + id1 + "' AND user2id='" + id2 + "') OR (user2id='" + id1 + "' AND user1id='" + id2 + "')"), function (err, rows) {
                    connection.release();
                };
                connection.on('error', function (err) {
                    callback(false);
                    return;
                });
            });
        }
    });

};

function checkadminid(email, callback) {
    console.log("herew" + email);
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(false);
            return;
        }
        connection.query('SELECT * FROM users WHERE id = ?', [email], function (err, result)
        {
            if (err) {
                callback(err, null);
            } else {
                console.log(result + "result dav");
                if (result.length !== 0) {
                    var id = result[0].id;
                    var type = result[0].usertype;
                    if (type === "admin") {
                        callback(0);
                    } else {
                        callback(result[0].id);
                    }
                    console.log("---->" + result[0].id);

//                return result[0].id;
                }

            }

        });
    });


}
;

function changeid(email) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(false);
            return;
        }
        connection.query('SELECT * FROM users WHERE id = ?', [email], function (err, result)
        {
            if (err) {
                callback(err, null);
            } else {
                console.log(result + "result dav");
                if (result.length !== 0) {
                    var id = result[0].id;
                    var type = result[0].usertype;
                    if (type === "admin") {
//                     callback(0);
                        dav = result[0].id;
                    } else {
                        dav = result[0].id;
//                     callback(result[0].id);
                    }
                    console.log("---->" + result[0].id);

//                return result[0].id;
                }

            }

        });
    });

}

function convert2id(email) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(false);
            return;
        }
        connection.query('SELECT id FROM users WHERE email = ?', [email], function (err, result)
        {
            if (err) {
                callback(err, null);
            } else {
                console.log(result + "result dav");
                if (result.length !== 0) {
                    console.log("---->" + result[0].id);
//                    callback(null, result[0].id);
                    return result[0].id;
                }

            }

        });
    });


}














//var port = process.env.port || 3001;
//console.log(port);
//app.set('port', process.env.PORT || 3000);
http.listen(port, function () {
    console.log("listening on port " + port);
});
