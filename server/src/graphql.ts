
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateSessionInput {
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export interface UpdateSessionInput {
    id: number;
}

export interface CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export interface UpdateUserInput {
    id: number;
}

export interface Session {
    id?: Nullable<string>;
    userId?: Nullable<string>;
    userAgent?: Nullable<string>;
    valid?: Nullable<boolean>;
}

export interface IQuery {
    sessions(): Nullable<Session>[] | Promise<Nullable<Session>[]>;
    session(id: number): Nullable<Session> | Promise<Nullable<Session>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createSession(createSessionInput: CreateSessionInput): Session | Promise<Session>;
    updateSession(updateSessionInput: UpdateSessionInput): Session | Promise<Session>;
    removeSession(id: number): Nullable<Session> | Promise<Nullable<Session>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

type Nullable<T> = T | null;
