type StripDollar<T> = {
  [K in keyof T as K extends `$${string}`
    ? K extends `$${infer U}`
      ? U
      : K
    : K]: T[K];
};

export default StripDollar;
