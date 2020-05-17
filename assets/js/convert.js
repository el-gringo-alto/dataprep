const path = require('path');

var vidFile = document.getElementById('vid');
var output = document.getElementById('output');

var submitBtn = document.getElementById('submit');

function convertVideo(inFile, outFile) {
	try {
        const ffmpeg = require('ffmpeg');
		var process = new ffmpeg(inFile);

		process.then(function(video) {
			video.addCommand('-c:v', 'wmv2');
			video.addCommand('-b:v', '1024');
			video.addCommand('-c:a', 'wmav2');
			video.addCommand('-b:a', '192k');
			video.addCommand('-g', '9999');
			video.addCommand('-bf', '0');
			video.save(outFile, function(error, file) {
				if (!error)
					console.log(file + ' is ready to get fucked');
			});

		}, function(err) {
			console.log('Error: ' + err);
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}
};


function outputFilename(inFile) {
    // TODO: make output to custom directory
    //       right now this just outputs the directory of the input file
    return path.format({
        dir: path.dirname(inFile.path),
        name: path.basename(inFile.name, path.extname(inFile.name)) + '_converted',
        ext: '.wav'
    })
}


vidFile.addEventListener('change', function() {
	document.getElementById('video-to-convert').innerHTML = `${this.files[0].name} to ${outputFilename(this.files[0])}`;
	submitBtn.style.display = 'block';
    // var newName = path.basename(inFile, path.extname(inFile)) + '_converted.wmv';
	console.log(this.files[0]);
    console.log(outputFilename(this.files[0]));
})

submitBtn.addEventListener('click', function() {
	convertVideo(vidFile.files[0].path);
})
