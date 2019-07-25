sap.ui.define([
        'sap/m/Token',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'jquery.sap.global',
        'sap/m/MessageToast',
        'sap/ui/core/Fragment',
        'sap/ui/model/Filter',
        'sap/base/Log'
    ],
    function (Token, Controller, JSONModel, jQuery, MessageToast, Fragment, Filter, Log) {
        "use strict";
        var second = sap.ui.controller("SapUI5Tutorial.Application.Login.controller.Second");
        return Controller.extend("SapUI5Tutorial.Application.Login.controller.Third", {

            onInit: function () {
                second.personeListele();


                //Todo Ekleme Ekranındaki durum Bilgilerini İçerir
                var durumValue = [{
                        "durumName": "Yeni"
                    },
                    {
                        "durumName": "Beklemede"
                    },
                    {
                        "durumName": "İşleniyor"
                    },
                    {
                        "durumName": "Test"
                    },
                    {
                        "durumName": "Problem"
                    },
                    {
                        "durumName": "Tamamlandı"
                    },
                    {
                        "durumName": "Kapatıldı"
                    },
                    {
                        "durumName": "İptal Edildi"
                    },
                ]
                //Todo Ekleme Ekranında Öncelik Bilgilerini İçerir
                var oncelikValue = [{
                        "oncelikName": "Düşük"
                    },
                    {
                        "oncelikName": "Orta"
                    },
                    {
                        "oncelikName": "Yüksek"
                    },
                    {
                        "oncelikName": "Çok Yüksek"
                    },

                ]
                //Todo Ekranında öncelik ve durum bilgilerini ekler(seteder).
                oModel.setProperty("/Durumlar", durumValue);
                oModel.setProperty("/Oncelikler", oncelikValue);
                this.projeListele();
            },

            //Proje EKleme Düzenleme Silme Dialogunu açar.
            onPressNavToProje: function () {
                if (!this._oDialogProje) {
                    this._oDialogProje = sap.ui.xmlfragment("SapUI5Tutorial.Application.Login.fragment.Proje", this);
                    this._oDialogProje.setModel(this.getView().getModel());
                }
                this._oDialogProje.open();
                sap.ui.getCore().byId("projenameInput").setValue("")

            },

            //Projeleri Listeleme işlemi yapar
            projeListele: function () {
                websql.listeleProje().then(function (fulfilled) {
                    var diziProje = Object.assign([], fulfilled.rows);
                    var projeDizi = [];
                    diziProje.forEach(function (item) {
                        projeDizi.push({
                            "projeNames": item.ProjeName
                        })
                    })
                    oModel.setProperty("/Projeler", projeDizi);
                })
            },

            //tıklanan proje adının inputa gelmesini sağlar
            onListProjepress: function (oEvent) {
                var proje = oEvent.getParameter("listItem").getBindingContext().getObject()
                localStorage.setItem("eskiProje", proje.projeNames);
                sap.ui.getCore().byId("projenameInput").setValue(proje.projeNames);

            },

            //Todo Ekleme Düzenleme Silme Dialogunu açar.
            onPressNavToDo: function () {
                if (!this._oDialogTodo) {
                    this._oDialogTodo = sap.ui.xmlfragment("SapUI5Tutorial.Application.Login.fragment.Todo", this);
                    this._oDialogTodo.setModel(this.getView().getModel());
                }
                this.onPresClearTodo();
                this._oDialogTodo.open();
            },

            //Todo Dialogunu Çağırıldıgı yerde Temizler
            onPresClearTodo: function () {
                sap.ui.getCore().byId('miProjeName').removeAllTokens();
                sap.ui.getCore().byId("miProjeKime").removeAllTokens();
                sap.ui.getCore().byId("miProjeBilgi").removeAllTokens();
                sap.ui.getCore().byId("inProjeKonu").setValue("");
                sap.ui.getCore().byId("cbProjeOncelik").setValue("");
                sap.ui.getCore().byId("cbProjeDurum").setValue("");
            },

            //inputa yazılan değeri proje tablosuna ekler
            onpresAddProje: function (oEvent) {
                var projeAdı = sap.ui.getCore().byId("projenameInput").getValue();
                var array = [projeAdı];
                var value = ["ProjeName"];
                var getdata = "?"
                websql.projeinsert('Projelist', value, getdata, array);
                this.projeListele();
                sap.ui.getCore().byId("projenameInput").setValue("")

            },

            //tododa girilen bilgileri tabloya ekleme işi yapar
            onpressAddTodo: function () {
                var projeAdı = sap.ui.getCore().byId("miProjeName")._sSelectedValue;
                var kimden=sap.ui.getCore().byId("miProjeKimden")._sSelectedValue;
                var kime=sap.ui.getCore().byId("miProjeKime")._sSelectedValue;
                var bilgi=sap.ui.getCore().byId("miProjeBilgi")._sSelectedValue;
                var konu=sap.ui.getCore().byId("inProjeKonu").getValue();
                var oncelik=sap.ui.getCore().byId("cbProjeOncelik").getValue();
                var durum=sap.ui.getCore().byId("cbProjeDurum").getValue();
                var array = [projeAdı,kimden,kime,bilgi,konu,oncelik,durum];
                var value = ["ProjeName","Kimden","Kime","Bilgi","Konu","Oncelik","Durum"];
                var getdata="?,?,?,?,?,?,?"
                console.log(projeAdı);
                console.log(kimden);

                // if(projeAdı !=""){
                //     websql.insert('Todolist', value, getdata, array);
                //     this.onPresClearTodo();
                // }
                // else{
                //     alert("eksık bilgi")
                // } 
            },

            //seçilen proje adını inputta yazan değere göre günceller
            onpresUpdateProje: function () {
                var esProje = localStorage.getItem("eskiProje");
                var yeProje = sap.ui.getCore().byId("projenameInput").getValue();
                console.log(yeProje);
                websql.projeUpdate(esProje, yeProje).then(function (fulfilled) {
                    var dizi = Object.assign([], fulfilled.rows);
                    dizi.forEach(function (item) {
                        console.log(item.ProjeName);
                    })
                });
                this.projeListele();
                sap.ui.getCore().byId("projenameInput").setValue("")
            },

            //inputta yazan proje ismini siler
            onpresDeleteProje: function () {
                var silProje = sap.ui.getCore().byId("projenameInput").getValue();
                websql.projeDelete(silProje);
                sap.ui.getCore().byId("projenameInput").setValue("")
                this.projeListele();
            },

            //proje dialogunu kapatır
            projeClose: function () {
                sap.ui.getCore().byId("projeFragment").close()
            },

            //todo dialogunu kapatır
            todoClose: function () {
                sap.ui.getCore().byId("todoFragent").close()
            },

            beforeOpen: function (oEvent) {
                var mail = localStorage.getItem("LoginMail")
                var oMultiInput = sap.ui.getCore().byId('miProjeKimden');
                oMultiInput.setTokens([
                    new sap.m.Token({
                        text: mail
                    })
                ])
            },
        });

    });