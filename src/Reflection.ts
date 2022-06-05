export interface IPropertyInfo {
    Name: string;
    Object: any;
    Property: any;
    Metadata: any;
}


export interface IMethodInfo {
    Name: string;
    Object: any;
    Metadata: any;
}


export class Reflection {
    private static ClassMetadata: {[type: string]: {[key: string]: any} } = {};
    private static PropertyMetadata: { [type: string]: {[property: string]: {[key: string]: any} } } = {};

    // region Reflection
    public static GetProperties(object: any): string[] {
        return Reflection.GetAll(object)
            .filter(name => typeof object[name] !== "function");
    }
    public static GetMethods(object: any): string[] {
        return Reflection.GetAll(object)
            .filter(name => typeof object[name] === "function");
    }
    public static GetAll(object: any): string[] {
        let properties: string[] = Object.getOwnPropertyNames(object);

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
    public static SetClassMetadata(object: any, key: string, data: any): void {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata).some(stored => stored === type)) Reflection.ClassMetadata[type] = {};
        
        Reflection.ClassMetadata[type][key] = data;
    }
    public static GetClassOwnMetadata(object: any, key: string): any {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata).some(stored => stored === type)) return null;
        return Reflection.ClassMetadata[type][key];
    }
    public static HasClassOwnMetadata(object: any, key: string): boolean {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata).some(stored => stored === type)) return false;
        if (!Object.getOwnPropertyNames(Reflection.ClassMetadata[type]).some(stored => stored === key)) return false;
        return true;
    }
    public static HasClassMetadata(object: any, key: string): boolean {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasClassOwnMetadata(object, key)) return true;
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }

        return false;
    }
    public static GetClassMetadata(object: any, key: string): any {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasClassOwnMetadata(object, key)) return Reflection.GetClassOwnMetadata(object, key);
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }

        return null;
    }
    // endregion Class Metadata

    // region Property Metadata
    public static SetPropertyMetadata(object: any, property: string, key: string, data: any): void {
        let type = object.constructor.name;
        if (!Object.getOwnPropertyNames(Reflection.PropertyMetadata).some(stored => stored === type)) Reflection.PropertyMetadata[type] = {};
        if (!Object.getOwnPropertyNames(Reflection.PropertyMetadata[type]).some(stored => stored === property)) Reflection.PropertyMetadata[type][property] = {};
        
        Reflection.PropertyMetadata[type][property][key] = data;
    }
    public static HasPropertyMetadata(object: any, property: string, key: string): boolean {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasPropertyOwnMetadata(object, property, key)) return true;
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }

        return false;
    }
    public static GetPropertyMetadata(object: any, property: string, key: string): any {
        let type = object.constructor.name;
        while (type !== "Object") {
            if (Reflection.HasPropertyOwnMetadata(object, property, key)) return Reflection.GetPropertyOwnMetadata(object, property, key);
            object = Object.getPrototypeOf(object);
            type = object.constructor.name;
        }

        return null;
    }
    public static HasPropertyOwnMetadata(object: any, property: string, key: string): boolean {
        let type = object.constructor.name;
        if (!Reflection.PropertyMetadata.hasOwnProperty(type)) return false;
        if (!Reflection.PropertyMetadata[type].hasOwnProperty(property)) return false;
        if (!Reflection.PropertyMetadata[type][property].hasOwnProperty(key)) return false;
        return true;                        
    }
    public static GetPropertyOwnMetadata(object: any, property: string, key: string): any {
        let type = object.constructor.name;
        if (!Reflection.PropertyMetadata.hasOwnProperty(type)) return null;
        if (!Reflection.PropertyMetadata[type].hasOwnProperty(property)) return null;
        return Reflection.PropertyMetadata[type][property][key];                       
    }
    // endregion Property Metadata
    
    // region filters
    public static GetMethodsWithMetadata(object: any, key: string): IMethodInfo[] {        
		return Reflection.GetMethods(object)
                .filter(method => Reflection.HasPropertyMetadata(object, method, key))
				.map(method => { return { Object: object, Name: method, Metadata: Reflection.GetPropertyMetadata(object, method, key)}; });
	}
    public static GetPropertiesWithMetadata(object: any, key: string): IMethodInfo[] {        
		return Reflection.GetProperties(object)
				.filter(property => Reflection.HasPropertyMetadata(object, property, key))
				.map(property => { return { Object: object, Name: property, Metadata: Reflection.GetPropertyMetadata(object, property, key)}; });
	}
   // endregion
}