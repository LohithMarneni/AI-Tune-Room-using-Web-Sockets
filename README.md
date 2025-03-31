Backend:
dont till authentication in backend 
Forntend:
just initialized tailwind and tested

31-03-2025:
added crud operation in backend for songs need to add jwt first 
//
instructuctions for keeping audio links in front end 
Your Dropbox link is a shareable link, but for direct streaming in HTML, you need to modify it.

🔹 Modify the Link for Direct Streaming
Replace ?dl=0 with ?raw=1, so your new URL becomes:

bash
Copy
Edit
https://www.dropbox.com/scl/fi/b2vdo1ucjy44xkt5fe4e5/iSongs.info-01-Godari-Gattu.mp3?rlkey=am116im1z6c0ix1rxqfsq04di&st=j6nv5yrv&raw=1
✅ Basic HTML Code for Playing the Audio
html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Player</title>
</head>
<body>
    <h2>Audio Player</h2>
    <audio controls>
        <source src="https://www.dropbox.com/scl/fi/b2vdo1ucjy44xkt5fe4e5/iSongs.info-01-Godari-Gattu.mp3?rlkey=am116im1z6c0ix1rxqfsq04di&st=j6nv5yrv&raw=1" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</body>
</html>
This should work for streaming. 