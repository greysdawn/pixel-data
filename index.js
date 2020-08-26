const getpxls = require('get-pixels');

function rgb2hex(values) {
	return '#' +
		("0" + parseInt(values.r,10).toString(16)).slice(-2) +
		("0" + parseInt(values.g,10).toString(16)).slice(-2) +
		("0" + parseInt(values.b,10).toString(16)).slice(-2)
}

function getData(path) {
	getpxls(path, (err, imgdata) => {
		if(err) throw new Error(err);
		var pixels = [];
		for(var i = 0; i < imgdata.shape[0] * imgdata.shape[1]; i++) {
			var dat = imgdata.data.slice(i * 4, i * 4 + 4);
			pixels.push({r: dat[0], g: dat[1], b: dat[2], a: dat[3]});
		}

		var counts = {};
		for(var i = 0; i < pixels.length; i++) {
			var hex = rgb2hex(pixels[i]);
			if(counts[hex]) counts[hex] += 1;
			else counts[hex] = 1;
		}

		console.log(Object.keys(counts).map(k => `${k} : ${counts[k]}`).join('\n'));
		console.log('Image processed.');
	})

}

console.log('Procesing image...');
getData(process.argv[2]);