punkto
======

Punkto Application


## Golden Rules

1. All Code MUST HAVE a corresponding test (~100% test coverage required)
2. LESS should be used and not CSS
3. All methods, classes and properties MUST be properly documented using JSDoc comments
4. All code MUST conform to the style guide
5. All code MUST pass tests with 100% coverage before they will be accepted
6. 6. In lieue of a an API, use Jasmine 'mocks' to simluate APIs

## Files

- src
-   -/scripts - Client-side application code (angular)
-   -/test - Tests for the client-side application
-   -/assets - Any non-JS and non-core assets (images, assets, data)
-   -/views - Any HTML tempalte code used by application views

## Documentation

Jasmine Test Suite - http://jasmine.github.io/2.0/introduction.html   
Using Jasmine Mocks - http://eclipsesource.com/blogs/2014/03/27/mocks-in-jasmine-tests/

## Resources

AngularJS Unit Testing Guidance https://docs.angularjs.org/guide/unit-testing    
AngularJS E2E Testing Guidance https://docs.angularjs.org/guide/e2e-testing   
Twine JavaScript Style Guide / Standards https://github.com/twineapp/idiomatic.js   

## Workflow

For ease of development, use `grunt serve` to run the application while writing new code, serve will set up file watchers and a local development server (as well as opening a browser to it) and give you feedback on errors and issues as you change code within the application.

`grunt server` will also run any tests configured within the source code of the application after any chage is made, this will ensure that no regressions occurs.

## Setup

1. run `sudo npm install -g grunt-cli bower`
2. `npm install` (DO NOT USE sudo!)
3. cd into src and run `bower install`

## Running

| Action  | Command           |
|---------|-------------------|
| test    | `grunt test`      |
| serve   | `grunt serve`     |
| build   | `grunt build`     |

## Test Writing Guidance / Notes

- A testing unit should focus on one tiny bit of functionality and prove it correct.
- Each test unit must be fully independent. Each of them must be able to run alone, and also within the test suite, regardless of the order they are called. The implication of this rule is that each test must be loaded with a fresh dataset and may have to do some cleanup afterwards. This is usually handled by setUp() and tearDown() methods.
- Try hard to make tests that run fast. If one single test needs more than a few millisecond to run, development will be slowed down or the tests will not be run as often as desirable. In some cases, tests can’t be fast because they need a complex data structure to work on, and this data structure must be loaded every time the test runs. Keep these heavier tests in a separate test suite that is run by some scheduled task, and run all other tests as often as needed.
- Learn your tools and learn how to run a single test or a test case. Then, when developing a function inside a module, run this function’s tests very often, ideally automatically when you save the code.
Always run the full test suite before a coding session, and run it again after. This will give you more confidence that you did not break anything in the rest of the code.
- It is a good idea to implement a hook that runs all tests before pushing code to a shared repository.
If you are in the middle of a development session and have to interrupt your work, it is a good idea to write a broken unit test about what you want to develop next. When coming back to work, you will have a pointer to where you were and get back on track faster.
- The first step when you are debugging your code is to write a new test pinpointing the bug. While it is not always possible to do, those bug catching tests are among the most valuable pieces of code in your project.
- Use long and descriptive names for testing functions. The style guide here is slightly different than that of running code, where short names are often preferred. The reason is testing functions are never called explicitly. square() or even sqr() is ok in running code, but in testing code you would have names such as test_square_of_number_2(), test_square_negative_number(). These function names are displayed when a test fails, and should be as descriptive as possible.
- When something goes wrong or has to be changed, and if your code has a good set of tests, you or other maintainers will rely largely on the testing suite to fix the problem or modify a given behavior. Therefore the testing code will be read as much as or even more than the running code. A unit test whose purpose is unclear is not very helpful is this case.
- Another use of the testing code is as an introduction to new developers. When someone will have to work on the code base, running and reading the related testing code is often the best they can do. They will or should discover the hot spots, where most difficulties arise, and the corner cases. If they have to add some functionality, the first step should be to add a test and, by this means, ensure the new functionality is not already a working path that has not been plugged into the interface.
