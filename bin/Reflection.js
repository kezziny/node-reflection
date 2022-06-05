"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflection = void 0;
class Reflection {
    // region Reflection
    static GetProperties(object) {
        return Reflection.GetAll(object)
            .filter(name => typeof object[name] !== "function");
    }
    static GetMethods(object) {
        return Reflection.GetAll(object)
            .filter(name => typeof object[name] === "function");
    }
    static GetAll(object) {
        let properties = Object.getOwnPropertyNames(object);
        let type = object.constructor.name;
        while (type !== "Object") {
            Object.getOwnPropertyNames(Object.getPrototypeOf(object))
                .filter(name => !properties.some(property => property === name))
                .forEach(name => properties.push(name));
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }
        return properties;
    }
    // endregion Reflection
    // region Class Metadata
    static SetClassMetadata(object, key, data) {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata).some(stored => stored === type))
            Reflection.ClassMetadata[type] = {};
        Reflection.ClassMetadata[type][key] = data;
    }
    static GetClassOwnMetadata(object, key) {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata).some(stored => stored === type))
            return null;
        return Reflection.ClassMetadata[type][key];
    }
    static HasClassOwnMetadata(object, key) {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata).some(stored => stored === type))
            return false;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata[type]).some(stored => stored === key))
            return false;
        return true;
    }
    static HasClassMetadata(object, key) {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasClassOwnMetadata(object, key))
                return true;
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }
        return false;
    }
    static GetClassMetadata(object, key) {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasClassOwnMetadata(object, key))
                return Reflection.GetClassOwnMetadata(object, key);
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }
        return null;
    }
    // endregion Class Metadata
    // region Property Metadata
    static SetPropertyMetadata(object, property, key, data) {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.PropertyMetadata).some(stored => stored === type))
            Reflection.PropertyMetadata[type] = {};
        if (!Object.getOwnPropertyNames(Reflection.PropertyMetadata[type]).some(stored => stored === property))
            Reflection.PropertyMetadata[type][property] = {};
        Reflection.PropertyMetadata[type][property][key] = data;
    }
    static HasPropertyMetadata(object, property, key) {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasPropertyOwnMetadata(object, property, key))
                return true;
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }
        return false;
    }
    static GetPropertyMetadata(object, property, key) {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasPropertyOwnMetadata(object, property, key))
                return Reflection.GetPropertyOwnMetadata(object, property, key);
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }
        return null;
    }
    static HasPropertyOwnMetadata(object, property, key) {
        let type = object.constructor.name;
        if (!Reflection.PropertyMetadata.hasOwnProperty(type))
            return false;
        if (!Reflection.PropertyMetadata[type].hasOwnProperty(property))
            return false;
        if (!Reflection.PropertyMetadata[type][property].hasOwnProperty(key))
            return false;
        return true;
    }
    static GetPropertyOwnMetadata(object, property, key) {
        let type = object.constructor.name;
        if (!Reflection.PropertyMetadata.hasOwnProperty(type))
            return null;
        if (!Reflection.PropertyMetadata[type].hasOwnProperty(property))
            return null;
        return Reflection.PropertyMetadata[type][property][key];
    }
    // endregion Property Metadata
    // region filters
    static GetMethodsWithMetadata(object, key) {
        return Reflection.GetMethods(object)
            .filter(method => Reflection.HasPropertyMetadata(object, method, key))
            .map(method => { return { Object: object, Name: method, Metadata: Reflection.GetPropertyMetadata(object, method, key) }; });
    }
    static GetPropertiesWithMetadata(object, key) {
        return Reflection.GetProperties(object)
            .filter(property => Reflection.HasPropertyMetadata(object, property, key))
            .map(property => { return { Object: object, Name: property, Metadata: Reflection.GetPropertyMetadata(object, property, key) }; });
    }
}
exports.Reflection = Reflection;
Reflection.ClassMetadata = {};
Reflection.PropertyMetadata = {};
