[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F315ODO5)
# Yoto Archival Downloader
Archival file content downloader for Yoto Player

This project provides a simple and efficient tool for downloading audio, icon, coverart, and metadata files from Yoto cards and MYO playlists. The tool is designed to help users easily backup their purchased content in a future-proof medium.

![image](https://github.com/user-attachments/assets/9baf2b9d-09fb-49a8-b91c-d2cf1fc92b1e)

## Known Issues
1. Card Titles that have `'` or other special characters are likely to cause the filenames to be completely broken.

## Fork - September 26, 2024

I've forked this from the original creator because I wanted to perform a significant rework.
- reformated the links to one track per line with a link to their icon and track file prepared with a better file name for mass downloading
- Removed all the instructions and simplified the preamble. Presumably, if you ar eusing this you know what it does and how to use it.
- refactored the proposed table to minimize real estate. It's not the prettiest but it it will work :)
- Deletes the unused file links and banners (footer, player controls) so SMD works better.
- Fixed an error with MYO cards having undefined language strings throwing an error instead of just showing up blank.
- standardize the "undefined" string with a const
- refactored the container layouts
- added/fixed the archival blob download
- updated link to point to my git
- Updated the Key:: Value pair delimiter
- broke metadata fields into a new basic and extended section headers and the MYO stats
- re-ordered the metadata fields
- added helper functions for readableSize and readableDuration
- noted the differences between MYO cards and official cards
- handle certain fields that may be blank, show them as 'undefined' now
- Added a link to download the Cover art
- Renamed the files to include the CardTitle and a 3-digit padded track number
- Added a metadata text field that pulls lots of non-identifying information from the card so it can be stored in a text file.

## Future Ideas
- ~reformat the links to one track per line with a link to their icon and track file prepared with a better file name for mass downloading~
- ~delete the banner at the bottom of the page~
- ~remove the useless download links so they don't get downloaded~
- ~consider deleting the player widget and stuff~
- figure out how to minimize the code and make the bookmarklet automatically. my code got too long 🤷‍♂️

## Features

- Download audio files from Yoto.
- Download icon files from Yoto.
- Create a metadata file from the card details.
- Download the card art (cover art) from Yoto.
- User-friendly interface for hassle-free operation.
- When used with Simple Mass Downloader, batch download multiple files simultaneously and retain the original file names


## Prerequisites

- A browser with JavaScript enabled, probably HTML5 support
- The Code from  `JS code`
- [Simple Mass Downloader](https://chromewebstore.google.com/detail/simple-mass-downloader/abdkkegmcbiomijcbdaodaflgehfffed) (optional but very much recommended)
- NFC Tools app ([Andriod](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=en_US&gl=US) | [iOS](https://apps.apple.com/us/app/nfc-tools/id1252962749))

## Bookmarklet
Create a bookmark in your browser and paste this into the link location. This will let you simply click the bookmark link when you are on a yoto.io page to activate the code.
```
coming soon
```

## Usage

### Step 1:
Scan a Yoto card with a third-party NFC reader app (like NFC Tools) to read the card's content. Look for Record 1. This should have a URL that looks like this: `yoto.io/ABC123?xxxxxxx=yyyyyyyy`

<img src="imgs/NFC Tools.png" width="200" >


### Step 2:
Open the yoto.io URL in your web browser on your computer (not your phone).

### Step 3:
Press `F12` on your keyboard to open the developer tools, enter the **Console** screen

![image](https://github.com/user-attachments/assets/c09379bd-a317-42bf-be73-d06196927b09)

### Step 4:
Copy the entire JS code file and paste it into the console. Press `Enter` to execute the code. You'll know it worked if you see an orage box appear on the top of the page. If you get an error in the console, it didn't work. 

### Step 5:
Download the files you'd like using "save as.." or select multiple files for batch downloading using Simple Mass Downloader. Set mask name to **Link text** in Simple Mass Downloader to download the files with the track names intact. 

<img src="imgs/name mask.png" width="200" >

### Step 6:
To complete the archvial process, make sure to download the Tracks, Icons, Metadata file and Card Art. Zip the whole bundle up and store it somewhere safe.
**Note: When using Simple Mass Downloader, the metadata text file is not downloaded automatically. You need to just click that one link to download it.**

## Cleanup Notes
To minify and inset into a bookmarkable link
1. edit in a text editor like Notepad++
2. use `//.*?(?=\r?$)` as a **regular expression** to find/repalce all comments in the code
3. use `\r\n` as an **extended search** to find/replace all line breaks
4. use `\t`  as a **normal search** to find/replace all extra tab spacing, this should not impact strings. if you've converted tabs to spaces, use `  ` (two spaces).
5. use Plugins>MIME Tools> URL Encode to create the bookmarklet one-liner
   Note: the current version (as of sept 26 2024) is too long to be convereted into a bookmarklet

## Bug Reporting
If you get an error in your console, [please fill out this form](https://forms.gle/WhgsMjzJ2jmpN5Vx8) to privately send me the playlist link so I can investigate. Please submit the yoto.io URL with your bug report so I can test what didn't work. (not the URL from the browser bar, it needs to be the full URL with the cardID and random-character-looking contents after that.

## Disclaimer 
This tool is not affiliated with Yoto. Yoto is a registered trademark of Yoto Limited.

This tool is provided as-is without any warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. The developers are not affiliated with, endorsed by, or sponsored by Yoto or any associated entities. The use of this tool for downloading content should be done in accordance with the copyright laws and terms of service of the respective audio content providers. Users are responsible for ensuring that their use of the tool complies with all relevant laws and regulations.


