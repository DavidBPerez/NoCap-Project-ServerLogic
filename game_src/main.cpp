#include <iostream>

using namespace std;

int main() {
  string cmd;
  cout << "Hello :) Pretend this is the game menu." << endl;

  while (true) {
    cin >> cmd;

    if(cmd == "start") {
      cout << "Starting game..." << endl;
    } else if (cmd == "exit") {
      cout << "Exiting game..." << endl;
      break;
    }
  }
  
  return 0;
}
