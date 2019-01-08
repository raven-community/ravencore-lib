Ravencore Library
=======

A pure and powerful JavaScript Ravencoin library.

## Principles

Ravencoin is a powerful new peer-to-peer platform for the next generation of financial technology. The decentralized nature of the Ravencoin network allows for highly resilient Ravencoin infrastructure, and the developer community needs reliable, open-source tools to implement Ravencoin apps and services.

## Get Started

```
npm install ravencore-lib
```

```
bower install ravencore-lib
```

## Examples

* [Generate a random address](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#generate-a-random-address)
* [Generate a address from a SHA256 hash](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#generate-a-address-from-a-sha256-hash)
* [Import an address via WIF](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#import-an-address-via-wif)
* [Create a Transaction](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#create-a-transaction)
* [Sign a Ravencoin message](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#sign-a-ravencoin-message)
* [Verify a Ravencoin message](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#verify-a-ravencoin-message)
* [Create an OP RETURN transaction](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#create-an-op-return-transaction)
* [Create a 2-of-3 multisig P2SH address](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#create-a-2-of-3-multisig-p2sh-address)
* [Spend from a 2-of-2 multisig P2SH address](https://github.com/underdarkskies/ravencore-lib/blob/master/docs/examples.md#spend-from-a-2-of-2-multisig-p2sh-address)


## Security

We're using ravencore in production, but please use common sense when doing anything related to finances! We take no responsibility for your implementation decisions.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/underdarkskies/ravencore-lib/blob/master/CONTRIBUTING.md) file.

## Building the Browser Bundle

To build a ravencore-lib full bundle for the browser:

```sh
gulp browser
```

This will generate files named `ravencore-lib.js` and `ravencore-lib.min.js`.

## Development & Tests

```sh
git clone https://github.com/underdarkskies/ravencore-lib
cd ravencore-lib
npm install
```

Run all the tests:

```sh
gulp test
```

You can also run just the Node.js tests with `gulp test:node`, just the browser tests with `gulp test:browser`
or create a test coverage report (you can open `coverage/lcov-report/index.html` to visualize it) with `gulp coverage`.

## License

Code released under [the MIT license](https://github.com/underdarkskies/ravencore-lib/blob/master/LICENSE).
