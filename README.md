# Chat Plugin for RPG Maker MZ

This is a plugin that allows players to chat in RPG Maker MZ and adds commands like /me and /w.

## Installation

- Download the plugin file ChatPlugin.js and place it in the js/plugins folder of your project.
- Open the Plugin Manager in RPG Maker MZ and add ChatPlugin to the list of plugins.
- Configure the plugin parameters according to your preferences.

## Usage

- To open the chat scene, press the chat button on the map scene. The button is located at the top right corner of the screen by default.
- To enter a message, type in the chat input box and press ok or enter. The message will be sent to other players or added to the chat window depending on the network API you use.
- To use a command, start your message with a slash (/) followed by the command name and arguments. For example: /me smiles or /w Alice Hi.
- The available commands are:

  - /me: Displays an action message in italics without a name. For example: /me laughs -> *laughs*
  - /w: Displays a whisper message in a different color with a prefix. For example: /w Bob Hello -> [Whisper] Alice: Hello

## Disclaimer

This plugin is incomplete and may not work as intended. It does not implement any network functionality and relies on some external API to send and receive messages. It may also have bugs, errors or compatibility issues with other plugins. Use it at your own risk.
