declare interface Fn<T = any> {
  (...arg: T[]): T;
}


declare type Nullable<T> = T | null;

declare type Optional<T> = {
  [P in keyof T]+?: T[P];
};

declare interface AnyObject {
  [key: string]: string;
}