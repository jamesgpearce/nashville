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
            store: null,
            itemTpl: ''
        });

        this.listCard = new Ext.Panel({
            dockedItems: [this.listCardToolbar],
            items: [this.listCardDataList],
            layout: 'fit'
        });

        this.detailCardToolbar = new Ext.Toolbar({
            dock: 'top',
            title: '...'
        });

        this.detailCard = new Ext.Panel({
            dockedItems: [this.detailCardToolbar]
        });

        nv.viewport = new Ext.Panel({
            layout: 'card',
            fullscreen: true,
            cardSwitchAnimation: 'slide',
            items: [this.listCard, this.detailCard]
        });
    }
});