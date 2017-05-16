import { IScheduler } from 'rxjs/Scheduler'
import { Observable, ObservableInput } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { from } from 'rxjs/observable/from'
import 'rxjs/add/operator/filter'

export class ActionsObservable<T> extends Observable<T> {
  static of<T>(item1: T, scheduler?: IScheduler): ActionsObservable<T>
  static of<T>(item1: T, item2: T, scheduler?: IScheduler): ActionsObservable<T>
  static of<T>(item1: T, item2: T, item3: T, scheduler?: IScheduler): ActionsObservable<T>
  static of<T>(item1: T, item2: T, item3: T, item4: T, scheduler?: IScheduler): ActionsObservable<T>
  static of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, scheduler?: IScheduler): ActionsObservable<T>
  static of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, item6: T, scheduler?: IScheduler): ActionsObservable<T>
  static of<T>(...array: Array<T | IScheduler>): ActionsObservable<T>
  static of<T>(...actions: Array<T | IScheduler>) {
    return new this(of(...actions))
  }

  static from<K>(ish: ObservableInput<K>, scheduler?: IScheduler): ActionsObservable<K>
  static from<K, R>(ish: ArrayLike<K>, scheduler?: IScheduler): ActionsObservable<K>

  static from<K>(ish: ObservableInput<K> | ArrayLike<K>, scheduler?: IScheduler) {
    return new this(from(ish, scheduler))
  }

  constructor(actionsSubject: Observable<T>) {
    super()
    this.source = actionsSubject
  }

  lift(operator: Function): Observable<T> {
    const observable = new ActionsObservable(this)
    observable.operator = operator
    return observable
  }

  ofType(...keys: string[]) {
    return this.filter(({ type }: any) => {
      const len = keys.length
      if (len === 1) {
        return type === keys[0]
      } else {
        for (let i = 0; i < len; i++) {
          if (keys[i] === type) {
            return true
          }
        }
      }
      return false
    })
  }
}
