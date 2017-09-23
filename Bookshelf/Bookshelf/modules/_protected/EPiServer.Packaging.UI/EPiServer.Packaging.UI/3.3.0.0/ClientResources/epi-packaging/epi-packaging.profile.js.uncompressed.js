var profile = {

    resourceTags: {
        // Files that contain test code.
        test: function (filename, mid) {
            return false;
        },

        // Files that should be copied as-is without being modified by the build system.
        copyOnly: function (filename, mid) {
            return false;
        },

        // Files that are AMD modules.
        amd: function (filename, mid) {
            return /\.js$/.test(filename);
        }
    },

    trees: [
        [".", ".", /(\/\.)|(~$)/]
    ]
};