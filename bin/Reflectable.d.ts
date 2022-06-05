import { IMethodInfo } from "./Reflection";
export declare class Reflectable {
    GetProperties(): string[];
    GetMethods(): string[];
    HasClassMetadata(key: string): any;
    GetClassMetadata(key: string): any;
    HasPropertyMetadata(property: string, key: string): any;
    GetPropertyMetadata(property: string, key: string): any;
    GetMethodsWithMetadata(key: string): IMethodInfo[];
    GetPropertiesWithMetadata(key: string): IMethodInfo[];
    CallMethodsWithMetadata(key: string, ...args: any[]): void;
}
