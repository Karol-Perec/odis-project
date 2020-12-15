import React from 'react';
import { useState } from 'react';
import '../../styles/index.css';

function SecurityList() {
  const [showInfo, setShowInfo] = useState(false);
  const [index, setIndex] = useState(0);

  const description = [
    {},
    { title: 'noSQL Injections', content: 'NoSQL injections enable an attacker to inject code into the query that would be executed by the database. These flaws are introduced when software developers create dynamic database queries that include user supplied input\n\n In MongoDB, $gtselects those documents where the value of the field is greater than (i.e. >) the specified value. Thus above statement compares password in database with empty string for greatness, which returns true.\n\nWhen you type {$gt: ""} in place of the password, it will always be true and will allow the hacker to hack in.\n\nTo prevent you should: \n\nValidate inputs to detect malicious values\n\nTo minimize the potential damage of a successful injection attack, do not assign DBA or admin type access rights to your application accounts. Similarly minimize the privileges of the operating system account that the database process runs under.\n\nBuild your noSQL queries so that they are not sent directly to the database' },
    { title: 'Cross Site Scripting (XSS)', content: '' },
    {
      title: 'Broken Authentication & Session Management - IdentityManager',
      content: 'These types of weaknesses can allow an attacker to either capture or bypass the authentication methods that are used by a web application.These types of weaknesses can allow an attacker to either capture or bypass the authentication methods that are used by a web application.\nIt consists in stealing a logged-in users token and using it by a hacker. In order to prevent such behavior, user session support must be implemented. A user logging in creates a session - his credentials will be valid as long as the session is in the database. When logging out the user removes the session, which results in the uselessness of the token that the hacker stole.\n\nIn our example, the user is stored in the local memory of the browser. To see how the security works - log in to the site - copy the authorization token - log out - the token moves to another browser or incognito card. As you can see, in protected mode, the stolen token does not work, while in unprotected mode, it does.'
    },
    {
      title: 'Insecure Direct Object References - DOM (Document Object Model)',
      content:
        'Insecure direct object references (IDOR) are a type of access control vulnerability that arises when an application uses user-supplied input to access objects directly \n\nConsider a website that uses the following URL to access the customer account page, by retrieving information from the back-end database: https://insecure-website.com/customer_account?customer_number=132355 \n\nThis is a highly inappropriate approach. In our case, unprotected user tasks are downloaded in this way. To download all the tasks from the database, simply replace: \n\nhttp://localhost:5000/api/tasks/?userid=5e7a117dd1af1149ccedd889\n\nto:\n\nhttp://localhost:5000/api/tasks/?\n\nTo prevent this from happening, it is necessary to:\n-deliver data using the POST\n method to protect the server from empty query queries.'
    },
    { title: 'Cross-Site Request Forgery (CSRF)', content: '' }
  ];

  return (
    <div className="security-list__container">
      <ul>
        <li
          onClick={() => {
            toggleInfo(1);
          }}
        >
          SQL Injections
        </li>
        <li
          onClick={() => {
            toggleInfo(2);
          }}
        >
          Cross Site Scripting (XSS)
        </li>
        <li
          onClick={() => {
            toggleInfo(3);
          }}
        >
          Broken Authentication & Session Management - IdentityManager
        </li>
        <li
          onClick={() => {
            toggleInfo(4);
          }}
        >
          Insecure Direct Object References - DOM (Document Object Model)
        </li>
        <li
          onClick={() => {
            toggleInfo(5);
          }}
        >
          Cross-Site Request Forgery (CSRF)
        </li>
      </ul>
      {showInfo ? (
        <div className="security-info__container">
          <div className="security-info--close" onClick={closeInfo}>
            close
          </div>
          <div className="security-info--title">{description[index].title}</div>
          <div className="security-info--content">
            {description[index].content}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );

  function toggleInfo(index) {
    setShowInfo(true);
    setIndex(index);
  }

  function closeInfo() {
    setShowInfo(false);
  }
}

export default SecurityList;
