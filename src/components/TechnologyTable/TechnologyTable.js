import React from 'react';

import './TechnologyTable.css';

import TechnologyItem from '../TechnologyItem/TechnologyItem';

const TechnologyTable = () => {
  return (
    <ul className="technology-table">
      <TechnologyItem url={'https://developer.mozilla.org/ru/docs/Web/HTML'} title={'HTML'} />
      <TechnologyItem url={'https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/CSS_basics'} title={'CSS'} />
      <TechnologyItem url={'https://developer.mozilla.org/ru/docs/Web/JavaScript'} title={'JS'} />
      <TechnologyItem url={'https://developer.mozilla.org/ru/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started'} title={'React'} />
      <TechnologyItem url={'https://developer.mozilla.org/ru/docs/Learn/Tools_and_testing/GitHub'} title={'Git'} />
      <TechnologyItem url={'https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs'} title={'Express.js'} />
      <TechnologyItem url={'https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/mongoose'} title={'mongoDB'} />
    </ul>
  );
}

export default TechnologyTable;