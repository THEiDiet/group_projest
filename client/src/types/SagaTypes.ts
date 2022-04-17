import { ForkEffect } from 'redux-saga/effects'

export type GenericReturnType = Generator<ForkEffect<never>, void, unknown>
