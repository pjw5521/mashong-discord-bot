export const COMMAND = Symbol('COMMAND');
export const SetCommand = () => {
    const decoratorFactory = (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(COMMAND, descriptor.value(), target);
    };

    return decoratorFactory;
};
