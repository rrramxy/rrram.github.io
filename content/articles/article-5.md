# TypeScript 高级类型体操：从入门到实践

## 为什么需要高级类型？

TypeScript 的类型系统远比你想象的强大。掌握高级类型技巧，不仅能写出更安全的代码，还能获得更好的开发体验。IDE 的智能提示、自动补全、类型检查都会变得更加精准。

## 类型推断与类型守卫

### 类型推断

TypeScript 会尽可能推断类型：

```typescript
let x = 3;           // 推断为 number
const arr = [1, 2];  // 推断为 number[]
const obj = { a: 1, b: 'hello' };  // 推断为 { a: number; b: string }
```

### 类型守卫

在运行时检查类型：

```typescript
function format(input: string | number) {
  if (typeof input === 'string') {
    return input.toUpperCase();  // TypeScript 知道这里 input 是 string
  }
  return input.toFixed(2);  // 这里 input 是 number
}
```

## 泛型进阶

泛型是 TypeScript 类型系统的核心：

### 泛型约束

```typescript
interface Lengthwise {
  length: number;
}

function log<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // 安全访问 length
  return arg;
}
```

### 泛型推断

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];  // 返回类型自动推断为 T[K]
}
```

## 条件类型

条件类型让类型具有逻辑判断能力：

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
```

### 实用条件类型

TypeScript 内置了一些实用类型：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

## 映射类型

映射类型可以批量创建类型：

### 基本映射

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### 键的重映射

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

## infer 关键字

infer 用于在条件类型中推断类型：

```typescript
type ArrayElement<T> = T extends (infer E)[] ? E : T;

type Elem = ArrayElement<string[]>;  // string
```

### 提取 Promise 结果

```typescript
type PromiseResult<T> = T extends Promise<infer R> ? R : T;

type Result = PromiseResult<Promise<string>>;  // string
```

## 模板字面量类型

模板字面量类型让字符串类型更精确：

```typescript
type EventName = `on${Capitalize<string>}`;

type ClickEvent = 'onClick';
type HoverEvent = 'onHover';

// 类型检查
const event: EventName = 'onClick';  // OK
const invalid: EventName = 'click';  // Error
```

## 递归类型

递归类型可以处理嵌套结构：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};
```

## 类型体操实战

### 实现 Pick

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### 实现 Record

```typescript
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
```

### 实现 Omit

```typescript
type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;
```

## 最佳实践

1. **不要过度设计**：简单类型往往足够
2. **利用工具类型**：内置类型很强大
3. **保持可读性**：复杂类型需要注释
4. **渐进增强**：逐步提高类型精度

## 结语

TypeScript 的类型系统是一门艺术。从基础到高级，每个层次都有其价值。在实践中学习，在错误中成长。

掌握类型体操，让代码更安全，让开发更愉悦。

---

*类型不仅是约束，更是表达。*