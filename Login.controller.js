sap.ui.define([
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("SapUI5Tutorial.Application.Login.controller.Login", {

            onInit: function () {
                websql.create();
            },

            //kayıtlı kullanıcının giriş yapabilmesi için yazılan fonksiyon
            loginBtn: function () {
                // localStorage.setItem("value", "asdfg")
                // var deg = localStorage.getItem("value");
                // console.log(deg);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var kulgirisMail = this.getView().byId("emailInput").getValue();
                var kulgirisSifre = this.getView().byId("passwordInput").getValue();
                localStorage.setItem("LoginMail", kulgirisMail);
                //kullanıcı mail şifre ve pozisyonuna göre yönlendirecek sayfa. leaderse personel sayfasına
                //leader deilse todo sayfasına gidecek.
                websql.controlPersonel(kulgirisMail).then(function (fulfilled) {
                    var dizi = Object.assign([], fulfilled.rows);
                    dizi.forEach(function (item) {
                        if (kulgirisMail == item.Email && kulgirisSifre == item.Password && item.Possition == "Leader") {
                            oRouter.navTo("Second");
                            console.log(item.Email);
                        }
                        else {
                            oRouter.navTo("Third");
                        }
                    })
                })
            },

        });
    });