import React from 'react';

const HtmlRaw = ({ children, isPreWrap }) => {
	const styles = {};

	if (isPreWrap) {
		styles.whiteSpace = 'pre-wrap';
	}

	return <div style={styles} dangerouslySetInnerHTML={{ __html: children }} />;
};

export default HtmlRaw;
