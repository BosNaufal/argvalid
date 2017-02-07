import assert from 'assert'
import chai, { expect } from 'chai';

import argvalid from '../src/index.js';

describe('valid()', () => {

  let obj;
  beforeEach(function () {
    obj = {

      test(name) {
        return argvalid({ name }, {
            type: String,
            required: true
          }
        )
      },

      defaultValue(hello) {
        return argvalid({ hello }, {
            type: Number,
            defaultValue: 1
          }
        )
      },


      defaultValueFunc(hello) {
        return argvalid({ hello }, {
            type: Number,
            defaultValue: () => 1
          }
        )
      },

      inArray(id, name) {
        return argvalid([
          { id }, {
            type: Number,
            required: true
          },
          { name }, {
            type: String,
            required: true,
            defaultValue: ""
          },
        ])
      },

      arrayTypes(datas) {
        return argvalid({ datas },{
          type: [Boolean, Array],
          required: true,
          defaultValue: false
        })
      },

      customValidator(custom) {
        return argvalid({ custom },{
          required: true,
          validator(val) {
            if (val.length === 3) return true
            return false
          }
        })
      }

    }
  });


  it("Should Return an Object When It's Valid", function () {
    let actual = obj.test('hai')
    expect(actual).to.be.an('object')
  });


  it("Should Throw Error When It's not Valid", function () {
    expect(obj.test.bind(2)).to.throw(Error)
    expect(obj.test.bind([1,2,3])).to.throw(Error)
    expect(obj.test.bind(true)).to.throw(Error)
    expect(obj.test.bind({ hai: 'halo' })).to.throw(Error)
  });

  it("Should Throw Error When it's required", function () {
    expect(obj.test.bind()).to.throw(Error)
  });

  it("Should Fill The undefined when Default Value is Existed", function () {
    let actual = obj.defaultValue()
    expect(actual).to.be.an('object')
  });

  it("Should Work If The Default Value Is A Function", function () {
    let actual = obj.defaultValueFunc()
    expect(actual).to.be.an('object')
  });

  it("Should Work With Array Validation", function () {
    let actual = obj.inArray(1)
    expect(actual).to.be.an('object')
  });

  it("Should Work With Array Types", function () {
    let actual = obj.arrayTypes(true)
    expect(actual).to.be.an('object')

    actual = obj.arrayTypes([])
    expect(actual).to.be.an('object')

    actual = obj.arrayTypes()
    expect(actual).to.be.an('object')
  });

  it("Should Support Custom Validator", function () {
    let actual = obj.customValidator('hai')
    expect(actual).to.be.an('object')
  });

  it("Should Doesn't Care With Types When Custom Validator Existed", function () {
    let actual = obj.customValidator('hai')
    expect(actual).to.be.an('object')
  });


});
