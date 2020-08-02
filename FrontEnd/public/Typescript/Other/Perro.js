"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Prueba_1 = require("../Prueba");
var Perro = /** @class */ (function (_super) {
    __extends(Perro, _super);
    function Perro(cond) {
        var _this = _super.call(this, 'Mensaje') || this;
        _this.cond = cond;
        return _this;
    }
    Perro.prototype.Imprimir_Mensaje = function () {
        if (this.cond) {
            this.Mensaje('df');
        }
        else {
            this.Suma();
        }
    };
    Perro.prototype.Mensaje = function (e) {
        console.log('Provando las clases abstractas');
    };
    return Perro;
}(Prueba_1.Prueba));
exports.Perro = Perro;
