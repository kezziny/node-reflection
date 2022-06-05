"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflectable = void 0;
const Reflection_1 = require("./Reflection");
class Reflectable {
    GetProperties() { return Reflection_1.Reflection.GetProperties(this); }
    GetMethods() { return Reflection_1.Reflection.GetMethods(this); }
    HasClassMetadata(key) { return Reflection_1.Reflection.HasClassMetadata(this, key); }
    GetClassMetadata(key) { return Reflection_1.Reflection.GetClassMetadata(this, key); }
    HasPropertyMetadata(property, key) { return Reflection_1.Reflection.HasPropertyMetadata(this, property, key); }
    GetPropertyMetadata(property, key) { return Reflection_1.Reflection.GetPropertyMetadata(this, property, key); }
    GetMethodsWithMetadata(key) { return Reflection_1.Reflection.GetMethodsWithMetadata(this, key); }
    GetPropertiesWithMetadata(key) { return Reflection_1.Reflection.GetPropertiesWithMetadata(this, key); }
    CallMethodsWithMetadata(key, ...args) { this.GetMethodsWithMetadata(key).forEach(method => { method.Object[method.Name](...args); }); }
}
exports.Reflectable = Reflectable;
