## discord.3gx

This Discord bot automatically builds 3DS plugin files (.3gx) from source code uploaded via GitHub or directly in Discord.

## 🚀 Features
- Automatically creates private channels for each build request.
- Handles ZIP file uploads containing 3DS plugin source code.
- Compiles the code and sends back the `.3gx` file upon successful build.

## ⚙️ Requirements
- **Node.js** (v16 or higher recommended)
- **Discord.js v14**
- **Discord Bot Token**
- **devkitPro**: Required for building 3DS homebrew applications. You can install devkitPro from [https://devkitpro.org/](https://devkitpro.org/).

## 📦 Configuration
Create a `.env` file in the root directory with the following environment variables:

```env
BOT_TOKEN=your_discord_bot_token
GUILD_ID=your_discord_server_id
CATEGORY_ID=category_id_for_private_channels
DEVKITPRO_PATH=path_to_your_devkitPro_directory
```

- **BOT_TOKEN:** Your Discord bot token.
- **GUILD_ID:** The ID of your Discord server.
- **CATEGORY_ID:** The ID of the category where build channels will be created.
- **DEVKITPRO_PATH:** Absolute path to your devkitPro installation.

## 🚀 Usage
1. **Start the bot:**
   ```bash
   node index.js
   ```
2. **On Discord:**
   - Go to the designated channel.
   - Type `.3gx` to initiate the build process.
   - The bot will prompt: `📁 Send the zip file of your 3gx source`.
   - Upload your ZIP file containing the 3DS plugin source code.
3. **Wait for the build:**
   - The bot will compile the code.
   - You'll receive the built `.3gx` file in the same channel.

## 📝 Notes
- Each user can create only one build channel at a time.
- Build channels are automatically deleted after 5 minutes of inactivity.

## 💻 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License
This project is licensed under the MIT License.
