/* Steps to to run server app:
 * 1. Check console to make sure you're in 'cd game_src'
 * 2. Type 'make main' after each final edit
 * 3. Run index.js (then client)
 */

#include <iostream>

using namespace std;

int main() {
  string cmd;
  cout << "Hello :) Pretend this is the game running." << endl;

  while (true) {
    cin >> cmd;

    if(cmd == "start") {
      cout << "Starting game..." << endl;
    } else if (cmd == "new") {
      cout << "Creating new journey..." << endl;
      // Function here
    } else if (cmd == "exit") {
      cout << "Exiting game..." << endl;
      break;
    } else {
      cout << "Unrecognized game command." << endl;
    }
  }
  
  return 0;
}
