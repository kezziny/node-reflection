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
export declare class Reflection {
    private static ClassMetadata;
    private static PropertyMetadata;
    static GetProperties(object: any): string[];
    static GetMethods(object: any): string[];
    static GetAll(object: any): string[];
    static SetClassMetadata(object: any, key: string, data: any): void;
    static GetClassOwnMetadata(object: any, key: string): any;
    static HasClassOwnMetadata(object: any, key: string): boolean;
    static HasClassMetadata(object: any, key: string): boolean;
    static GetClassMetadata(object: any, key: string): any;
    static SetPropertyMetadata(object: any, property: string, key: string, data: any): void;
    static HasPropertyMetadata(object: any, property: string, key: string): boolean;
    static GetPropertyMetadata(object: any, property: string, key: string): any;
    static HasPropertyOwnMetadata(object: any, property: string, key: string): boolean;
    static GetPropertyOwnMetadata(object: any, property: string, key: string): any;
    static GetMethodsWithMetadata(object: any, key: string): IMethodInfo[];
    static GetPropertiesWithMetadata(object: any, key: string): IMethodInfo[];
}
