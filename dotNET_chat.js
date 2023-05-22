/*:
 * @plugindesc A plugin that allows players to chat in RPG Maker MZ and adds commands like /me and /w
 * @author Крыжовник aka Cyberpsychoz
 *
 * @param Chat Window Width
 * @desc The width of the chat window in pixels
 * @type number
 * @min 0
 * @default 400
 *
 * @param Chat Window Height
 * @desc The height of the chat window in pixels
 * @type number
 * @min 0
 * @default 200
 *
 * @param Chat Window X
 * @desc The x position of the chat window on the screen
 * @type number
 * @min 0
 * @default 0
 *
 * @param Chat Window Y
 * @desc The y position of the chat window on the screen
 * @type number
 * @min 0
 * @default 0
 *
 * @param Chat Font Size
 * @desc The font size of the chat messages in pixels
 * @type number
 * @min 0
 * @default 16
 *
 * @param Chat Input Width
 * @desc The width of the chat input box in pixels
 * @type number
 * @min 0
 * @default 300
 *
 * @param Chat Input Height
 * @desc The height of the chat input box in pixels
 * @type number
 * @min 0
 * @default 24
 *
 * @param Chat Input X
 * @desc The x position of the chat input box on the screen
 * @type number
 * @min 0
 * @default 50
 *
 * @param Chat Input Y
 * @desc The y position of the chat input box on the screen
 * @type number
 * @min 0
 * @default 220

 */

(function() {

    // Get the plugin parameters

    var parameters = PluginManager.parameters('ChatPlugin');
    var chatWindowWidth = Number(parameters['Chat Window Width'] || 400);
    var chatWindowHeight = Number(parameters['Chat Window Height'] || 200);
    var chatWindowX = Number(parameters['Chat Window X'] || 0);
    var chatWindowY = Number(parameters['Chat Window Y'] || 0);
    var chatFontSize = Number(parameters['Chat Font Size'] || 16);
    var chatInputWidth = Number(parameters['Chat Input Width'] || 300);
    var chatInputHeight = Number(parameters['Chat Input Height'] || 24);
    var chatInputX = Number(parameters['Chat Input X'] || 50);
    var chatInputY = Number(parameters['Chat Input Y'] || 220);

    // Create a new scene for the chat

    function Scene_Chat() {
        this.initialize.apply(this, arguments);
    }

    Scene_Chat.prototype = Object.create(Scene_Base.prototype);
    Scene_Chat.prototype.constructor = Scene_Chat;

    Scene_Chat.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_Chat.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createChatWindow();
        this.createChatInput();
        this.activateChatInput();
    };

    Scene_Chat.prototype.createChatWindow = function() {
        this._chatWindow = new Window_Chat(chatWindowX, chatWindowY, chatWindowWidth, chatWindowHeight);
        this._chatWindow.setHandler('ok', this.onChatOk.bind(this));
        this.addWindow(this._chatWindow);
    };

    Scene_Chat.prototype.createChatInput = function() {
        this._chatInput = new Window_ChatInput(chatInputX, chatInputY, chatInputWidth, chatInputHeight);
        this._chatInput.setHandler('ok', this.onChatInputOk.bind(this));
        this.addWindow(this._chatInput);
    };

    Scene_Chat.prototype.activateChatInput = function() {
        this._chatInput.activate();
        this._chatInput.open();
    };

    Scene_Chat.prototype.onChatOk = function() {
        // Do something when the player presses ok on the chat window, such as scrolling down or closing it

        // For example:

        // this._chatWindow.scrollDown();

        // or

        // SceneManager.pop();
    };

    Scene_Chat.prototype.onChatInputOk = function() {
        // Do something when the player presses ok on the chat input box, such as sending the message or clearing it

        // For example:

        // var message = this._chatInput.text();

        // Send the message to other players using some network API

        // Network.send(message);

        // or

        // Add the message to the chat window

        // this._chatWindow.addMessage(message);

        // Clear the input box

        // this._chatInput.clear();

        // Reactivate the input box

        // this.activateChatInput();
    };

    // Create a new window for the chat messages

    function Window_Chat() {
        this.initialize.apply(this, arguments);
    }

    Window_Chat.prototype = Object.create(Window_Selectable.prototype);
    Window_Chat.prototype.constructor = Window_Chat;

    Window_Chat.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._messages = [];
        this.refresh();
    };

    Window_Chat.prototype.standardFontSize = function() {
        return chatFontSize;
    };

    Window_Chat.prototype.maxItems = function() {
        return this._messages.length;
    };

    Window_Chat.prototype.itemHeight = function() {
        return this.lineHeight();
    };

    Window_Chat.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var message = this._messages[index];
        
        // Check if the message is a command like /me or /w and format it accordingly

        if (message.startsWith('/me')) {
            // The message is an action, so use italics and omit the name

            message = message.slice(3); // Remove the /me part

            this.contents.fontItalic = true; // Set the font to italics

            this.drawText(message, rect.x, rect.y, rect.width); // Draw the message without a name

            this.contents.fontItalic = false; // Reset the font to normal

        } else if (message.startsWith('/w')) {
            // The message is a whisper, so use a different color and add a prefix

            message = message.slice(3); // Remove the /w part

            var colorId = 6; // Choose a color id for whispers (for example, purple)

            var prefix = '[Whisper] '; // Add a prefix to indicate a whisper

            this.changeTextColor(this.textColor(colorId)); // Change the text color to match the color id

            this.drawText(prefix + message, rect.x, rect.y, rect.width); // Draw the message with a prefix

            this.resetTextColor(); // Reset the text color to normal
          
} else {
            // The message is normal, so use the default color and add a name
            
            var colorId = 0; // Choose a color id for normal messages (for example, white)
            
            var name = message.split(':')[0]; // Get the name of the sender from the message
            
            var text = message.split(':')[1]; // Get the text of the message from the message
            
            var nameWidth = this.textWidth(name + ': '); // Calculate the width of the name part
            
            this.changeTextColor(this.textColor(colorId)); // Change the text color to match the color id
            
            this.drawText(name + ': ', rect.x, rect.y, nameWidth); // Draw the name part
            
            this.drawText(text, rect.x + nameWidth, rect.y, rect.width - nameWidth); // Draw the text part
            
            this.resetTextColor(); // Reset the text color to normal
            
        
}
        
};

Window_Chat.prototype.addMessage = function(message) {
    
// Add a new message to the end of the messages array
    
this._messages.push(message);

// Refresh and scroll down
    
this.refresh();

this.scrollDown();

};

// Create a new window for the chat input box

function Window_ChatInput() {

this.initialize.apply(this, arguments);

}

Window_ChatInput.prototype = Object.create(Window_NameEdit.prototype);

Window_ChatInput.prototype.constructor = Window_ChatInput;

Window_ChatInput.prototype.initialize = function(x, y, width, height) {

// Call the parent constructor with some dummy parameters for name and maxLength
    
Window_NameEdit.prototype.initialize.call(this, '', 100);

// Override some properties
    
this.x = x;

this.y = y;

this.width = width;

this.height = height;

this._nameWindow
  
// Hide the name window
this._nameWindow.hide();

// Create a new sprite for the cursor
this._cursorSprite = new Sprite_ChatCursor();

// Add the cursor sprite to the window
this.addChild(this._cursorSprite);

};

Window_ChatInput.prototype.standardFontSize = function() {
    return chatFontSize;
};

Window_ChatInput.prototype.itemRect = function(index) {
    // Override the item rect to match the input box size and position
    return {
        x: this.left(),
        y: 0,
        width: this.width - this.padding * 2,
        height: this.height - this.padding * 2
    };
};

Window_ChatInput.prototype.text = function() {
    // Return the text of the input box
    return this._name;
};

Window_ChatInput.prototype.clear = function() {
    // Clear the text of the input box
    this._name = '';
    this._index = 0;
    this.refresh();
};

// Create a new sprite for the cursor

function Sprite_ChatCursor() {
    this.initialize.apply(this, arguments);
}

Sprite_ChatCursor.prototype = Object.create(Sprite.prototype);
Sprite_ChatCursor.prototype.constructor = Sprite_ChatCursor;

Sprite_ChatCursor.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.createBitmap();
    this.update();
};

Sprite_ChatCursor.prototype.createBitmap = function() {
    // Create a bitmap with a single white pixel
    var bitmap = new Bitmap(1, 1);
    bitmap.fillAll('white');
    this.bitmap = bitmap;
};

Sprite_ChatCursor.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisibility();
    this.updatePosition();
};

Sprite_ChatCursor.prototype.updateVisibility = function() {
    // Show or hide the cursor depending on the input box state
    this.visible = this.parent.active && this.parent.isOpen();
};

Sprite_ChatCursor.prototype.updatePosition = function() {
    // Move the cursor to match the input box index
    var rect = this.parent.itemRect(this.parent._index);
    this.x = rect.x + 2;
    this.y = rect.y + 2;
    this.setFrame(0, 0, rect.width - 4, rect.height - 4);
};

// Create a new scene command to open the chat scene

function Scene_ChatCommand() {
    this.initialize.apply(this, arguments);
}

Scene_ChatCommand.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ChatCommand.prototype.constructor = Scene_ChatCommand;

Scene_ChatCommand.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ChatCommand.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createChatButton();
};

Scene_ChatCommand.prototype.createChatButton = function() {
    // Create a new button to open the chat scene
    this._chatButton = new Sprite_Button();
    this._chatButton.setClickHandler(this.commandChat.bind(this));
    this._chatButton.bitmap = ImageManager.loadSystem('ChatButton'); // Load an image for the button
    this._chatButton.x = Graphics.width - this._chatButton.width; // Place the button at the right edge of the screen
    this._chatButton.y = 0; // Place the button at the top of the screen
    this.addChild(this._chatButton);
};

Scene_ChatCommand.prototype.commandChat = function() {
    // Open the chat scene when the button is clicked
    SceneManager.push(Scene_Chat);
};

// Add the chat command scene to the map scene

var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createChatCommandWindow();
};

Scene_Map.prototype.createChatCommandWindow = function() {
    // Create a new chat command scene and add it to the map scene
    this._chatCommandWindow = new Scene_ChatCommand();
    this.addChild(this._chatCommandWindow);
};
