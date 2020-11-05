import {makeFirstLetterGoUpper, validateModuleName } from '../../commands/utils/helper'

describe('The controller file needs to have first letter go upper', () => {

    test('makeFirstLetterGoUpper function exists', () => {
        expect(typeof makeFirstLetterGoUpper).toEqual('function')
    })


    test('validateModuleName function exists', () => {
        expect(typeof validateModuleName).toEqual('function')
    })

    test('test should be Test', () => {
        expect(makeFirstLetterGoUpper('test')).toEqual('Test')
    })
})

describe('The module name cannot have space in between, all spaces need to be converted into underscore', () => {

    test('store items needs to be converted into store_items', () => {
        expect(validateModuleName('store items')).toEqual('store_items')
    })

    test('do the job', () => {
        const testName = 'do the job'
        expect(validateModuleName(testName)).toEqual('do_the_job')
    })
})