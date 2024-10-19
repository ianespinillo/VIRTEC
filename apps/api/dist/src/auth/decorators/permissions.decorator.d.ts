import type { Permissions } from '@repo/common';
export declare const PermissionsNeeded: (...permissions: Permissions[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
