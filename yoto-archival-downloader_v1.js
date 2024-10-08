// First, find the script element by its ID
const scriptElement = document.getElementById('__NEXT_DATA__');

// function to convert seconds integer into human readable length
function convertSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

// function to convert bytes data into human readable
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Function to delete elements with names matching a regex pattern
function deleteElementsByRegex(regexPattern) {
    // Get all elements in the document
    const allElements = document.querySelectorAll('*');
    
    // Loop through all elements
    allElements.forEach(element => {
        // Check if the element's name matches the regex pattern
        if (regexPattern.test(element.name)) {
            // Remove the element from the DOM
            element.remove();
        }
    });
}

// Check if the element exists
if (scriptElement) {
    const undef = 'undefined'; // to use when a field is not present
	
	// Parse the JSON content of the script element
    const jsonData = JSON.parse(scriptElement.textContent);
	
	// Navigate to the specific path where the card metadata is located
	const card = jsonData.props.pageProps.card;
	
    // Create a container for this widget
		const container = document.createElement('div');
		container.style.margin = '20px';
		container.style.backgroundColor = 'rgba(244, 84, 54, .6)';
		container.style.padding = '20px';

    // Create a title for the container
		const containerTitleApp = document.createElement('h2');
		containerTitleApp.innerHTML += '<a href="https://github.com/humor4fun/yoto-archival-downloader">Archival Downloader for Yoto</a>';

    // Create a description container, this is added to the Instructions container
		const containerDescription = document.createElement('p');
		containerDescription.innerHTML += 'You can download the MP3 files and view the images directly from the links below. Use <a href="https://chromewebstore.google.com/detail/simple-mass-downloader/abdkkegmcbiomijcbdaodaflgehfffed">Simple Mass Downloader</a> to download all at once.\n';
	
	// Create a list of instructions in a container
		const containerInstructions = document.createElement('div');
		const containerTitleInstructions = document.createElement('h3');
		containerTitleInstructions.innerHTML += 'Instructions';
		containerInstructions.appendChild(containerTitleInstructions);
		const containerInstructionsList = document.createElement('ol');
		const instructions = ['Wait until this page is loaded', 'Open the extension menu from your browser', 'Select "Resource List" at the top', 'Select "Load Page Links" at the top right', 'In the bottom left, select the "{name}" box', 'Choose "Link text" to set the name mask for easy file identification', 'Select all the files (simplest to just click the checkbox at the top to select ALL files)', 'Click the Download button in the bottom right and wait for the downloads to complete'];	
		instructions.forEach(item => {
			const li = document.createElement('li');
			li.textContent = item;
			containerInstructionsList.appendChild(li);
		});
		containerInstructions.appendChild(containerDescription);
		containerInstructions.appendChild(containerInstructionsList);
	
	
	// Create a container for the Metadata
		const containerMeta = document.createElement('div');
		const containerTitleMeta = document.createElement('h3');
		containerTitleMeta.innerHTML += 'Archival Metadata';
		containerMeta.appendChild(containerTitleMeta);

	// Get the important details that may not be defined, fallback on an undefined data so it doesn't look blank
		var category = "tbd"
		if(card.metadata.category === ""){
			category = undef;
		}else{
			category = card.metadata.category;
		}
		var author = "tbd"
		if(card.metadata.author === ""){
			author = undef;
		}else{
			author = card.metadata.author;
		}
		var slug = "tbd"
		if(card.slug === ""){
			slug = undef;
		}else{
			slug = card.slug;
		}
		
		var languages = "tbd"
		try{
			languages = card.metadata.languages.toString();
		}catch (e){
			languages = undef;
		}
	
    // Write metadata to a text file, use ":: " as the key::value pair delimiter for safer parsing down the road. We don't want to just drop the entire json blob into the file because it may contain personal data.
		const textMeta = document.createElement('textarea');    
		textMeta.setAttribute("rows", "5");
		textMeta.setAttribute("cols", "50");
		textMeta.innerHTML += `Basic Details\n================\n`;
		textMeta.innerHTML += `Title:: ${card.title}\n`;
		textMeta.innerHTML += `Author:: ${author}\n`; // only exsists for official cards
		textMeta.innerHTML += `Description:: ${card.metadata.description}\n`;
		textMeta.innerHTML += `\n`;
		
		textMeta.innerHTML += `Extended Details\n================\n`;
		textMeta.innerHTML += `Version:: ${card.content.version}\n`;
		textMeta.innerHTML += `Category:: ${category}\n`; // only exsists for official cards
		textMeta.innerHTML += `Languages:: ${languages}\n`;	//This is an array, so it needs to be forced into a string.
		textMeta.innerHTML += `PlaybackType:: ${card.content.playbackType}\n`;
		textMeta.innerHTML += `CardID:: ${card.cardId}\n`;
		textMeta.innerHTML += `CreatedAt:: ${card.createdAt}\n`;
		textMeta.innerHTML += `UpdatedAt:: ${card.updatedAt}\n`;
		textMeta.innerHTML += `Slug:: ${slug}\n`;  // only exsists for official cards
		textMeta.innerHTML += `sortkey:: ${card.sortkey}\n`;	
		textMeta.innerHTML += `Duration:: ${card.metadata.media.duration}\n`;
		textMeta.innerHTML += `ReadableDuration:: ${convertSeconds(card.metadata.media.duration)}\n`; // not always available, so let's just calculate it to be easier
		textMeta.innerHTML += `FileSize:: ${card.metadata.media.fileSize}\n`;
		textMeta.innerHTML += `ReadableFileSize:: ${formatBytes(card.metadata.media.fileSize)}\n`; // not always available, so let's just calculate it to be easier
		textMeta.innerHTML += `Note:: ${card.metadata.note}\n`;
		textMeta.innerHTML += `\n`;
	    
	// These fields only exist in MYO cards
		textMeta.innerHTML += `\n`;
		textMeta.innerHTML += `Share Statistics\n================\n`;
		textMeta.innerHTML += `ShareCount:: ${card.shareCount}\n`;
		textMeta.innerHTML += `Availability:: ${card.availability}\n`;
		textMeta.innerHTML += `ShareLinkUrl:: ${card.shareLinkUrl}\n`;    
		textMeta.innerHTML += `\n`;
		
		textMeta.innerHTML += `Track Details\n================\n`;    
		// metadata continues after the tracks are looped to include track details


	// Create a container for the Tracks
		const containerTracks = document.createElement('div');
		const containerTitleTracks = document.createElement('h3');
		containerTitleTracks.innerHTML += 'Tracks';
		containerTracks.appendChild(containerTitleTracks);
	
	// Create a container for the Icons
		const containerIcons = document.createElement('div');
		const containerTitleIcons = document.createElement('h3');
		containerTitleIcons.innerHTML += 'Icons';
		containerIcons.appendChild(containerTitleIcons);
	
	// Get the Track and Icon info and create links for it
		const chapters = jsonData.props.pageProps.card.content.chapters; // Navigate to the specific path where trackUrl, title, and icon16x16 are located
		
		// Initialize track and image numbers
			let trackNumber = 1;
			let imageNumber = 1;

		// Loop through chapters and tracks to create links
			chapters.forEach(chapter => {
				chapter.tracks.forEach(track => {
					// Create a link element for each track
					const trackLink = document.createElement('a');
					trackLink.href = track.trackUrl;

					// Pad the track number to 3 digits, Yoto cards can have up to 100 tracks
					trackLink.textContent = `${card.title} - ${String(trackNumber).padStart(3, 0)} - ${track.title}`; 
					trackLink.target = '_blank'; // Open in new tab
					trackLink.style.display = 'block'; // Display each link on a new line

					// Append the track link to the container
					containerTracks.appendChild(trackLink);

					// Add the track info into the metadata file
					textMeta.innerHTML += `TrackNumber:: ${String(trackNumber).padStart(3, 0)}\n`;
					textMeta.innerHTML += `Title:: ${track.title}\n`;
					textMeta.innerHTML += `Format:: ${track.format}\n`;
					textMeta.innerHTML += `Type:: ${track.type}\n`;
					textMeta.innerHTML += `Duration (Seconds):: ${track.duration}\n`;
					textMeta.innerHTML += `ReadableDuration:: ${convertSeconds(track.duration)}\n`; 
					textMeta.innerHTML += `FileSize:: ${track.fileSize}\n`;
					textMeta.innerHTML += `ReadableFileSize:: ${formatBytes(track.fileSize)}\n`;
					textMeta.innerHTML += `Channels:: ${track.channels}\n`;
					textMeta.innerHTML += `\n`;

					// Increment track number
					trackNumber++;

					// Create a link element for each image
					if (chapter.display && chapter.display.icon16x16) {
						const imageLink = document.createElement('a');
						imageLink.href = chapter.display.icon16x16;
						imageLink.textContent = `${card.title} - ${String(imageNumber).padStart(3, 0)} - ${track.title} (icon)`;
						imageLink.target = '_blank';
						imageLink.style.display = 'block';

						// Append the image link to the container
						containerIcons.appendChild(imageLink);

						// Increment image number
						imageNumber++;
					}
				});
			});

    // it would be good to put a button next to the textarea that copies the contents to clipboard if we can't set it to be downloadable.
    //Make the metadata content into a downloadable text file
		const metaRawText = textMeta.value; //get content of the text area
		const blob = new Blob([metaRawText], {type: 'text/plain'}); //create a blob with the content
		const metaLink = document.createElement('a'); //create a link element
		metaLink.href = window.URL.createObjectURL(blob); //create a url for the blob and set it to the href attribute
		metaLink.download = `${card.title}.txt`; // set the download attribute with a filename
		metaLink.textContent = `Metadata Download`; // give the link a text that matches the other listed items
		containerMeta.appendChild(textMeta); //append the textarea to the container for debug/inspect uses
		containerMeta.appendChild(document.createElement('p'));
		containerMeta.appendChild(metaLink); // append the metadata download link to the container
	
	// Get the card art and create a link for it
		const albumArtLink = document.createElement('a');
		albumArtLink.href = card.metadata.cover.imageL;
		albumArtLink.textContent = `${card.title} - cover`;
		albumArtLink.target = '_blank'; // Open in a new tab
		albumArtLink.style.display = 'block'; // Display link on a new line
		containerMeta.appendChild(albumArtLink); // Append the album art link to the container
	
	// Assemble the final container listed
	container.appendChild(containerTitleApp);
	container.appendChild(containerMeta);
	container.appendChild(containerIcons);
	container.appendChild(containerTracks);
	container.appendChild(containerInstructions);
	
    // Insert the container at the top of the body of the page
        document.body.insertBefore(container, document.body.firstChild);
	
    // Clean up some of the now-useless content from the page
        document.getElementsByClassName('Footer_appDownloadBar__g7nY9')[0].remove();
        document.getElementsByClassName('player-controls')[0].remove();

	
} else {
    console.error('Script element not found');
}
