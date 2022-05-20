import React from 'react';

const HtmlRaw = ({ children }) => <div dangerouslySetInnerHTML={{ __html: children }} />;

export default HtmlRaw;
