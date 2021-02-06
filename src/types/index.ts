type NestedPartial<T> = T extends object
  ? {
    [K in keyof T]?: NestedPartial<T[K]>;
  }
  : T;

type EventType =
  | 'app.record.index.show'
  | 'app.record.index.edit.show'
  | 'app.record.index.edit.submit'
  | 'app.record.index.edit.submit.success'
  | 'app.record.index.delete.submit'
  | 'app.record.detail.show'
  | 'app.record.detail.delete.submit'
  | 'app.record.detail.process.proceed'
  | 'app.record.create.show'
  | 'app.record.create.change'
  | 'app.record.create.submit'
  | 'app.record.create.submit.success'
  | 'app.record.edit.show'
  | 'app.record.edit.change'
  | 'app.record.edit.submit'
  | 'app.record.edit.submit.success'
  | 'app.record.print.show'
  | 'mobile.app.record.index.show'
  | 'mobile.app.record.detail.show'
  | 'mobile.app.record.detail.delete.submit'
  | 'mobile.app.record.detail.process.proceed'
  | 'mobile.app.record.create.show'
  | 'mobile.app.record.create.change'
  | 'mobile.app.record.create.submit'
  | 'mobile.app.record.create.submit.success'
  | 'mobile.app.record.edit.show'
  | 'mobile.app.record.edit.change'
  | 'mobile.app.record.edit.submit'
  | 'mobile.app.record.edit.submit.success';