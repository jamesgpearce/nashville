nv = new Ext.Application({

    launch: function() {
        this.viewport = new Ext.Panel({

            layout: 'card',
            fullscreen: true,
            html: "Hello world!"

        });
    }

});