sap.ui.define([
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'jquery.sap.global',
        'sap/m/MessageToast',
        'sap/ui/core/Fragment',
        'sap/ui/model/Filter',
        'sap/base/Log'
    ],
    function (Controller, JSONModel, jQuery, MessageToast, Fragment, Filter, Log) {
        "use strict";

        return Controller.extend("SapUI5Tutorial.Application.Login.controller.Second", {

            onInit: function () {
                var possitionValue = [{
                        "positionName": "Leader"
                    },
                    {
                        "positionName": "Consultant"
                    }
                ]
                oModel.setProperty("/Possition", possitionValue);
                this.personeListele();
            },

            //veritabanında  kayıtlı kullanıcıların listelenmesini saglar.
            personeListele: function () {
                websql.listelePersonel().then(function (fulfilled) {
                    var dizi = Object.assign([], fulfilled.rows);
                    var userDizi = [];
                    dizi.forEach(function (item) {
                        userDizi.push({
                            "personelMail": item.Email,
                            "personelPossition": item.Possition,
                            "pesonelPassword": item.Password
                        })
                    })
                    oModel.setProperty("/Personeller", userDizi);
                })
            },

            //girilerin verileri Members Tablosuna kaydeder ve inputları temizler
            onPressNavToAdd: function (oEvent) {
                var kullkayitMail = this.getView().byId("emailInput").getValue();
                var kullkayitSifre = this.getView().byId("passwordInput").getValue();
                var kullkayitPossition = this.getView().byId("comboPossition").getValue();
                var array = [kullkayitMail, kullkayitSifre, kullkayitPossition];
                var value = ["Email", "Password", "Possition"];
                var getdata = "?,?,?"
                websql.personelinsert('Members', value, getdata, array)
                this.personeListele();
                this.onPressClear();
                console.log(kullkayitMail);
            },

            //İşlem yaptıktan sonra personel ekleme ekranını temizler
            onPressClear: function () {
                this.getView().byId("emailInput").setValue("")
                this.getView().byId("passwordInput").setValue("")
                this.getView().byId("comboPossition").setValue("")
            },

            //Seilen personele Ait bilgileri Günceller
            onPressNavToUpdate: function () {
                var esMail = localStorage.getItem("eskiMail");
                var yeMail = this.getView().byId("emailInput").getValue();
                var yeSifre = this.getView().byId("passwordInput").getValue();
                var yePosition = this.getView().byId("comboPossition").getValue();
                websql.personelUpdate(esMail, yeMail, yeSifre, yePosition).then(function (fulfilled) {
                    var dizi = Object.assign([], fulfilled.rows);
                    dizi.forEach(function (item) {
                        console.log(item.Email);
                    })
                });
                this.personeListele();
                this.onPressClear();
            },

            //Seilen personelin kaydını siler
            onPressNavToDelete: function () {
                var silMail = this.getView().byId("emailInput").getValue();
                var table="Members"
                websql.sqlDelete(table,silMail);
                this.personeListele();
                this.onPressClear();
            },

            //personel listesinde tıklanan kullanıcının bilgilerini getirir
            onListItemPress: function (oEvent) {
                var personel = oEvent.getParameter("listItem").getBindingContext().getObject()
                localStorage.setItem("eskiMail", personel.personelMail);
                this.getView().byId("emailInput").setValue(personel.personelMail)
                this.getView().byId("passwordInput").setValue(personel.pesonelPassword)
                this.getView().byId("comboPossition").setValue(personel.personelPossition)

            },

            //PErsonel butonuna basınca proje ve todo ekleme duzenleme sayfasına yönlendirir
            onPressNavToPersonel: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Third");
            },

            //birsonakı splitapp lara geiş iin kullanılır. kullanıcı ile giriş yapınca yeni splitap açılır
            getSplitAppObj: function () {
                var result = this.byId("SplitAppDemo");
                if (!result) {
                    Log.info("SplitApp object can't be found");
                }
                return result;
            }

        });

    });