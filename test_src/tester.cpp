#include <iostream>
#include <string>

using namespace std;

class Tester {
  public:
    // Constructor
    Tester(const string& testName) : testName(testName) {}

    // Run the test
    virtual void run() {
      cout << "Running test: " << testName << endl;

      // Insert your test code here
      // Example: Run test cases and check results
      int result = runTestCases();

      if (result == 0) {
        cout << "Test passed!" << endl;
      } else {
        cout << "Test failed." << endl;
      }
    }

    // Destructor
    virtual ~Tester() {}

  private:
    string testName;

    // Define your test cases here
    int runTestCases() {
      // Add test cases as needed

      return result;
    }
};

int main() {
    Tester tester("MyTest"); // Replace "MyTest" with your test name
    tester.run();

    return 0;
}
