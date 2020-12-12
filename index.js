const express = require('express');
const app = express();
const port = 8000;

const db = require('./models/mongoose');
const Orders = require('./models/Orders');
const Items = require('./models/Items');

var schedule = require('node-schedule');

const ObjectsToCsv = require('objects-to-csv');

const send = require('./config/nodemailer');

const details = {
	from: 'glowbadge100@gmail.com',
	to: 'kumarmehlan@hmail.com',
	subject: 'some subject',
	html: '<h1>HI</h1>',
};

// we can create all these function in seperate files but because program is so small i decded to do it same function
const main = async () => {
	let items = await Orders.find({
		createdAt: {
			$lt: new Date(),
			$gte: new Date(new Date().setDate(new Date().getDate() - 1)),
		},
	})
		.sort({ createdAt: 'asc' })
		.populate('item', 'name')
		.lean();
	let NoOfTran = items.length;
	let vol = 0;
	let STran = 0;
	for (let i = 0; i < items.length; i++) {
		if (items[i].paid) {
			STran++;
		}
		vol = vol + items[i].amount;
	}
	details.vol = vol;
	details.STran = STran;
	details.NoOfTran = NoOfTran;
	details.html = `<p>volume : ${vol}</p><p>Successful Transection : ${STran}</p><p>No. Of tran : ${NoOfTran}</p>`;
	const csv = new ObjectsToCsv(items);
	await csv.toDisk('./sample.csv');
	await send(details);
	console.log('all done for today');
};

// Job schduler
var j = schedule.scheduleJob({ hour: 16, minute: 43 }, function () {
	console.log('Time for mail');
	main();
});

app.listen(port, function (err) {
	if (err) {
		console.log(`Error in running the server: ${err}`);
	}
	console.log(`Server is running on port: ${port}`);
});
