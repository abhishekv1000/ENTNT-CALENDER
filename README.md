<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

</head>
<body>
  <h1>EntNT Calendar</h1>
  <p>EntNT Calendar is a web application that allows admins to add companies and their information, while clients can appoint specific companies. Both admins and clients have access to the calendar view page to schedule and manage appointments.</p>
  
  <h2>Features</h2>
  <ul>
    <li><strong>Admin Features:</strong>
      <ul>
        <li>Add new companies with their respective information.</li>
        <li>Manage and update company details.</li>
        <li>View appointments and manage them via a calendar interface.</li>
      </ul>
    </li>
    <li><strong>Client Features:</strong>
      <ul>
        <li>Appoint specific companies.</li>
        <li>View calendar page with available slots.</li>
        <li>Schedule appointments with chosen companies.</li>
      </ul>
    </li>
    <li><strong>Shared Features:</strong>
      <ul>
        <li>Both admins and clients can view the calendar to manage or book appointments.</li>
      </ul>
    </li>
  </ul>

  <h2>Deployment</h2>
  <p>The application is deployed on Vercel and can be accessed using the link below:</p>
  <p><a href="https://entnt-calender.vercel.app/" target="_blank">EntNT Calendar</a></p>

  <h2>Installation</h2>
  <p>To run the project locally:</p>
  <ol>
    <li><strong>Clone the repository:</strong>
      <pre><code>git clone https://github.com/your-username/entnt-calendar.git
cd entnt-calendar</code></pre>
    </li>
    <li><strong>Install dependencies:</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Set up environment variables:</strong>
      <p>Create a <code>.env</code> file in the root directory and add the necessary environment variables (such as database URL, API keys, etc.).</p>
    </li>
    <li><strong>Run the development server:</strong>
      <pre><code>npm run dev</code></pre>
    </li>
    <li>Open <code>http://localhost:3000</code> in your browser to view the application.</li>
  </ol>

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js</li>
    <li><strong>Backend:</strong> Node.js (if applicable) / Express.js</li>
    <li><strong>Database:</strong> MongoDB / MySQL (depending on your setup)</li>
    <li><strong>Deployment:</strong> Vercel</li>
    <li><strong>Styling:</strong> CSS / Tailwind CSS / Material UI (if applicable)</li>
  </ul>

  <h2>Contributing</h2>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch (<code>git checkout -b feature/your-feature-name</code>).</li>
    <li>Make your changes.</li>
    <li>Commit your changes (<code>git commit -am 'Add new feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/your-feature-name</code>).</li>
    <li>Create a new pull request.</li>
  </ol>

  <h2>License</h2>
  <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>