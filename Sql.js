var websql = {
    db: openDatabase('Todo', 1.0, 'Websqldb', 20 * 1024 * 1024),
    create: function () {
        this.db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Members(id INTEGER PRIMARY KEY, Email VARCHAR(50), Password VARCHAR(50), Possition VARCHAR(50))', [], function () {
                console.log('Members Tablosu Oluşturuldu.');
            });
            tx.executeSql('CREATE TABLE IF NOT EXISTS Todolist(id INTEGER PRIMARY KEY, ProjeName VARCHAR(50), Kimden VARCHAR(50), Kime VARCHAR(50), Bilgi VARCHAR(50), Konu VARCHAR(50), Oncelik VARCHAR(50), Durum VARCHAR(50))',[],function (){
                console.log('Todolist Tablosu Oluşturuldu');
            });
            tx.executeSql('CREATE TABLE IF NOT EXISTS Projelist(id INTEGER PRIMARY KEY, ProjeName varchar(50))',[], function(){
                console.log('Projelist Tablosu Oluşturuldu');
            });
            // tx.executeSql('INSERT INTO Members(Email, Password,Possition) VALUES ("hamzacakmak@gmail.com","hamza1453","Leader")');
            //tx.executeSql('DELETE FROM Members Where id=2');
        });
    },
    controlPersonel: function (empMail) {
        return eklePromise = new Promise(
            function (resolve, reject) {
             websql.db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM Members WHERE Email=?', [empMail], function (islem, sonuc) {
                        if (sonuc.rows.length > 0) {
                            resolve(sonuc);
                        } else {
                            var reason = new Error("Böyle bir kullanıcı yok.");
                            reject(reason); 
                            alert("Hatalı Mail")// reject
                        }
                    }, function (islem, hata) {
                        console.log("Tablo Yok")
                        console.log("Hata: ", hata);
                    });
                });
            }
        );
    },

    listelePersonel:function(){
        return eklePromise = new Promise(
            function (resolve, reject) {
             websql.db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM Members ', [], function (islem, sonuc) {
                        if (sonuc.rows.length > 0) {
                            resolve(sonuc);
                        } else {
                            var reason = new Error("Böyle bir kullanıcı yok.");
                            reject(reason); // reject
                        }
                    },
                    function (islem, hata) {
                        console.log("Tablo Yok")
                        console.log("Hata: ", hata);
                    });
                });
            }
        );
    },
    listeleProje:function(){
        return eklePromise2 = new Promise(
            function (resolve, reject) {
             websql.db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM Projelist ', [], function (islem, sonuc) {
                        if (sonuc.rows.length > 0) {
                            resolve(sonuc);
                        } else {
                            var reason = new Error("Böyle Bir Proje Yok.");
                            reject(reason); // reject
                        }
                    },
                    function (islem, hata) {
                        console.log("Tablo Yok")
                        console.log("Hata: ", hata);
                    });
                });
            }
        );
    },
    personelinsert: function (tablename, colunm, getdata, value) {
        this.db.transaction(function (tx) {
            if(value[0] != "" && value[1] != "" && value[2] != ""){
                tx.executeSql('INSERT INTO ' + tablename + ' (' + colunm + ') VALUES (' + getdata + ')', value);
            }
            else{
                alert("eksik bilgi");
            }
           
        })
    },
    insert: function (tablename, colunm, getdata, value) {
        this.db.transaction(function (tx) {
                tx.executeSql('INSERT INTO ' + tablename + ' (' + colunm + ') VALUES (' + getdata + ')', value);
           
        })
    },

    projeinsert: function (tablename, colunm, getdata, value) {
        this.db.transaction(function (tx) {
            if(value[0] != "" ){
                tx.executeSql('INSERT INTO ' + tablename + ' (' + colunm + ') VALUES (' + getdata + ')', value);
            }
            else{
                alert("eksik bilgi");
            }
           
        })
    },

    personelUpdate: function (esMail,yeMail,yePassword,yePosition) {
        return eklePromise = new Promise(
            function (resolve, reject) {
             websql.db.transaction(function (tx) {
                 if(yeMail != "" && yePassword!= "" && yePosition != ""){
                    tx.executeSql('UPDATE Members SET Email=?, Password=?, Possition=? WHERE Email=?', [yeMail,yePassword,yePosition,esMail], function (islem, sonuc) {
                        resolve(sonuc);
                     }, function (islem, hata) {
                         console.log("Tablo Yok")
                         console.log("Hata: ", hata);
                     });
                 }


                });
            }
        );
    },
    projeUpdate:function(esProje,yeProje){
        return eklePromise=new Promise(
            function(resolve,reject){
                websql.db.transaction(function(tx){
                    if(yeProje !=""){
                        tx.executeSql('UPDATE Projelist SET ProjeName=? WHERE ProjeName=?', [yeProje,esProje],function(islem,sonuc){
                            resolve(sonuc);
                        },function(islem,hata){
                            console.log("Tablo Yok")
                            console.log("Hata: ",hata);
                        });
                    }
                });
            }
        );
    },

    projeDelete:function(silProje){
        this.db.transaction(function(tx){
            tx.executeSql('DELETE FROM Projelist where ProjeName="'+silProje+'" ');
        })
    },

    sqlDelete: function(table,silMail){
        this.db.transaction(function (tx) {
                tx.executeSql('DELETE FROM "'+table+'" where Email="'+silMail+'" ');
        })
    }

}