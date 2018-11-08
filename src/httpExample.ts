import * as http from 'http';

interface IFailure<E> {
    tag: "failure";
    reason: E;
}

interface ISuccess<T> {
    tag: "success";
    value: T;
}

type Failable<T, E> = IFailure<E> | ISuccess<T>;

function failable<T, U, E>(
    r: Failable<T, E>,
    f: (_: ISuccess<T>) => U,
    g: (_: IFailure<E>) => U
): U {
    switch(r.tag) {
        case "success": return f(r);
        case "failure": return g(r);
    }
}
