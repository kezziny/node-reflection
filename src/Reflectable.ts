import { IMethodInfo, Reflection } from "./Reflection";

export class Reflectable {
    public GetProperties(): string[] { return Reflection.GetProperties(this); }
    public GetMethods(): string[] { return Reflection.GetMethods(this); }

    public HasClassMetadata(key: string): any { return Reflection.HasClassMetadata(this, key); }
    public GetClassMetadata(key: string): any { return Reflection.GetClassMetadata(this, key); }
    
    public HasPropertyMetadata(property: string, key: string): any { return Reflection.HasPropertyMetadata(this, property, key); }
    public GetPropertyMetadata(property: string, key: string): any { return Reflection.GetPropertyMetadata(this, property, key); }

    public GetMethodsWithMetadata(key: string): IMethodInfo[] { return Reflection.GetMethodsWithMetadata(this, key); }
    public GetPropertiesWithMetadata(key: string): IMethodInfo[] { return Reflection.GetPropertiesWithMetadata(this, key); }

    public CallMethodsWithMetadata(key: string, ...args: any[]): void { this.GetMethodsWithMetadata(key).forEach(method => { method.Object[method.Name](...args); }); }
}