let home = async (req, res) => {
	return res.render('pages/home', {
		title: 'Home',
	});
};

module.exports = {
	home,
};
