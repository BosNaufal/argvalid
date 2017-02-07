# Argvalid

Make Sure That Your Variable Is Valid. It's usefull for runtime debugging. It will cut off your process whenever it found an unvalid variable. It's inspired by [Vue Props Validation](https://vuejs.org/v2/guide/components.html#Props) and it works simliarly.

## Installation
You can import [argvalid.js](./dist/argvalid.js) to your project files and process it with your preprocessor. **It Very recommended to use ES2015**. Because it will make you **easy to write** since [argvalid.js](https://github.com/BosNaufal/argvalid) is using [Property Shorthand](http://es6-features.org/#PropertyShorthand) Of ES6/ES2015

You can install it via NPM
```bash
npm install argvalid
```

```javascript
import argvalid from 'argvalid';

// Simple Example    
let obj = {

  // Simple Validation
  test(name) {
    const valid = argvalid({ name }, { // You Probably should note the first argument writing style
        type: String, // Is Using instanceof as a default validator
        required: true // Is it required to fill?
      }
    )
  },

  // Default Value
  defaultValue(hello) {
    const valid = argvalid({ hello }, {
        type: Number,
        defaultValue: 1 // You can set the default value of it
      }
    )
  },

  // Default Value With Function
  defaultValueFunc(hello) {
    const valid = argvalid({ hello }, {
        type: Number,
        defaultValue: () => 1
      }
    )
  },

  // You can validate many variable at once
  // And It will not change your writing style. Just put it in the array
  inArray(id, name) {
    const valid = argvalid([
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

  // You can use 2 or more types at once
  arrayTypes(datas) {
    const valid = argvalid({ datas },{
      type: [Boolean, Array], // Put it in an array
      required: true,
      defaultValue: false
    })
  },

  // You can even use custom validator
  customValidator(custom) {
    const valid = argvalid({ custom },{
      required: true,
      validator(val) {
        if (val.length === 3) return true
        return false
      }
    })
  }

  // After valid, you can use it as an object or just use it.
  itReturnObject(a, i, u, e, o) {
    const valid = argvalid([
      { a }, {
        type: Number,
        required: true
      },

      { i }, {
        type: String,
        required: true,
        defaultValue: ""
      },

      { u }, {
        type: Object,
      },

      { e }, {
        type: Array,
        required: true,
        defaultValue: ""
      },

      { o }, {
        type: Date,
        required: true,
      },

    ])
  }

}


// Then Run Some Function
obj.test() // Will Throw Error

```

## Thank You for Making this useful~

## Let's talk about some projects with me
Just Contact Me At:
- Email: [bosnaufalemail@gmail.com](mailto:bosnaufalemail@gmail.com)
- Skype Id: bosnaufal254
- twitter: [@BosNaufal](https://twitter.com/BosNaufal)


## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) Naufal Rabbani
