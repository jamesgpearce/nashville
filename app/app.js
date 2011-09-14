nv = new Ext.Application({
    launch: function() {

        this.data = {};

        this.data.Business = Ext.regModel('', {
            fields: [
                {name: "id", type: "int"},
                {name: "name", type: "string"},
                {name: "latitude", type: "string"},
                {name: "longitude", type: "string"},
                {name: "address1", type: "string"},
                {name: "address2", type: "string"},
                {name: "address3", type: "string"},
                {name: "phone", type: "string"},
                {name: "state_code", type: "string"},
                {name: "mobile_url", type: "string"},
                {name: "rating_img_url_small", type: "string"},
                {name: "photo_url", type: "string"},
            ]
        });

        this.listCardToolbar = new Ext.Toolbar({
            dock: 'top',
            title: 'Nashville Guide'
        });

        ['hotels', 'bars', 'restaurants'].forEach( function (type) {
            nv.data[type] = new Ext.data.Store({
                model: nv.data.Business,
                autoLoad: true,
                proxy: {
                    type: 'scripttag',
                    url: 'http://api.yelp.com/business_review_search' +
                        '?ywsid=' + YELP_KEY +
                        '&term=' + type +
                        '&location=Nashville,TN',
                    reader: {
                        type: 'json',
                        root: 'businesses'
                    }
                }
            });
        });

        this.ListCardDataList = Ext.extend(Ext.List, {
            store: null,
            itemTpl:
                '<img class="photo" src="http://src.sencha.io/40/{photo_url}" width="40" height="40"/>' +
                '{name}<br/>' +
                '<img src="{rating_img_url_small}"/>&nbsp;' +
                '<small>{address1}</small>',
            listeners: {
                selectionchange: function (selectionModel, records) {
                    if (records[0]) {
                        nv.viewport.setActiveItem(nv.detailTabs);
                        nv.detailCardToolbar.setTitle(records[0].get('name'));
                        nv.detailCard.update(records[0].data);

                        var map = nv.detailMap.map;
                        if (!map.marker) {
                            map.marker = new google.maps.Marker();
                            map.marker.setMap(map);
                        }
                        map.setCenter(
                            new google.maps.LatLng(
                                records[0].get('latitude'),
                                records[0].get('longitude')
                            )
                        );
                        map.marker.setPosition(
                            map.getCenter()
                        );

                    }
                }
            },
            plugins: [{
                ptype: 'pullrefresh'
            }]
        });


        this.stayCardDataList = new this.ListCardDataList({
            store: this.data.hotels,
            title: 'Stay',
            iconCls: 'briefcase1'
        });
        this.eatCardDataList = new this.ListCardDataList({
            store: this.data.restaurants,
            title: 'Eat',
            iconCls: 'heart'
        });
        this.drinkCardDataList = new this.ListCardDataList({
            store: this.data.bars,
            title: 'Drink',
            iconCls: 'music1'
        });

        this.listCard = new Ext.TabPanel({
            items: [this.stayCardDataList, this.eatCardDataList, this.drinkCardDataList],
            tabBar: {
                ui: 'light',
                layout: { pack: 'center' },
                dock: 'bottom'
            },
            cardSwitchAnimation: 'flip',
            dockedItems: [this.listCardToolbar],
            layout: 'fit'
        });

        this.detailCardToolbar = new Ext.Toolbar({
            dock: 'top',
            title: '...',
            items: [{
                text: 'Back',
                ui: 'back',
                handler: function () {
                    nv.viewport.setActiveItem(
                        nv.listCard,
                        {type: 'slide', direction: 'right'}
                    );
                }
            }]
        });

        this.detailCard = new Ext.Panel({
            styleHtmlContent: true,
            cls: 'detail',
            tpl: [
                '<img class="photo" src="{photo_url}" width="100" height="100"/>',
                '<h2>{name}</h2>',
                '<div class="info">',
                    '{address1}<br/>',
                    '<img src="{rating_img_url_small}"/>',
                '</div>',
                '<div class="phone x-button">',
                    '<a href="tel:{phone}">{phone}</a>',
                '</div>',
                '<div class="link x-button">',
                    '<a href="{mobile_url}">Read more</a>',
                '</div>'
            ],
            title: 'Info'
        });

        this.detailMap = new Ext.Map({
            title: 'Map'
        });

        this.detailTabs = new Ext.TabPanel({
            dockedItems: [this.detailCardToolbar],
            items: [this.detailCard, this.detailMap],
            tabBar: {
                ui: 'light',
                layout: { pack: 'center' }
            }
        });

        nv.viewport = new Ext.Panel({
            layout: 'card',
            fullscreen: true,
            cardSwitchAnimation: 'slide',
            items: [this.listCard, this.detailTabs]
        });
    }
});