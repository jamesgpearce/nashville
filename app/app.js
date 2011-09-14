nv = new Ext.Application({
    launch: function() {

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
            items: [this.listCardDataList]
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