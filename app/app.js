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

        this.data.restaurants = new Ext.data.Store({
            model: this.data.Business,
            autoLoad: true,
            proxy: {
                type: 'scripttag',
                url: 'http://api.yelp.com/business_review_search' +
                    '?ywsid=' + YELP_KEY +
                    '&term=Restaurant' +
                    '&location=Nashville,TN',
                reader: {
                    type: 'json',
                    root: 'businesses'
                }
            }
        });


        this.listCardToolbar = new Ext.Toolbar({
            dock: 'top',
            title: 'Nashville Guide'
        });

        this.listCardDataList = new Ext.List({
            store: this.data.restaurants,
            itemTpl:
                '<img class="photo" src="http://src.sencha.io/40/{photo_url}" width="40" height="40"/>' +
                '{name}<br/>' +
                '<img src="{rating_img_url_small}"/>&nbsp;' +
                '<small>{address1}</small>',
            listeners: {
                selectionchange: function (selectionModel, records) {
                    if (records[0]) {
                        nv.viewport.setActiveItem(nv.detailCard);
                        nv.detailCardToolbar.setTitle(records[0].get('name'));
                        nv.detailCard.update(records[0].data);
                    }
                }
            }
        });

        this.listCard = new Ext.Panel({
            dockedItems: [this.listCardToolbar],
            items: [this.listCardDataList],
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
            dockedItems: [this.detailCardToolbar],
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
            ]
        });

        nv.viewport = new Ext.Panel({
            layout: 'card',
            fullscreen: true,
            cardSwitchAnimation: 'slide',
            items: [this.listCard, this.detailCard]
        });
    }
});