(function () {
    'use strict';
    /**
     * Usage :
     *     ModuleExtender.register('pages', ModuleExtender.newPackage({
        id : 'extendedModule',
        label : 'Extended Module',
        order : 99,
        file : Config.templatesDir + 'temp.html'
    }));
     */

    angular.module('mcms.core')
        .service('ModuleExtender',Service);

    Service.$inject = ['lodashFactory'];

    function Service(lo) {
        var _this = this,
            Registry = {};

        this.registry = registry;
        this.register = register;
        this.newPackage = newPackage;
        this.extend = extend;

        function register(module, extention) {
            if (typeof Registry[module] == 'undefined'){
                Registry[module] = [];
            }

            if (lo.isArray(extention)){
                for (var i in extention){
                    if (!lo.find(Registry[module], {alias : extention[i]['alias']})){
                        Registry[module].push(extention[i]);
                    }
                }

                return _this;
            }

            Registry[module].push(extention);


            return _this;
        }

        function registry(module) {
            return (typeof module == 'undefined') ? Registry : Registry[module];
        }

        function newPackage(extention) {
            return {
                label : extention.label || '',
                file : extention.file || '',
                active : extention.active || false,
                default : extention.defaut || false,
                id : extention.alias || '',
                order : extention.order || 10000
            };
        }

        function extend(module, existing) {

            if (!lo.isArray(existing)){
                existing = [];
            }

            return reOrder(existing.concat(Registry[module]));
        }

        function reOrder(module) {
              return lo.orderBy(module, ['order', 'label'] , ['asc', 'asc']);
        }
    }
})();