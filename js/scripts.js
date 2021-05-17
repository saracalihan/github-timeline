// GitHub Timeline Component
// Version: 1.0.0
// Author: Alihan SARAC
// Contact address: 
//   + Email: saracalihan@gmail.com
//   + Twitter: @saracaIlihan
//   + GitHub: saracalihan
// > 16.05.2021

const defaultVariables = {
  grey: '#ddd',
  lightBlack: '#a8a8a8',
  softBlack: 'rgb(29, 28, 28)',
  hoverBacground: '#f7f7f7',
  heigth: '600px',
  width: '500px',
  headerFontSize: '28px',
  avatarSize: '80px',
  mainFontSize: '16px',
};

let variables = defaultVariables;

const updateStyles = function (variables) {
  return {
    main: `
            display: flex;
            flex-direction: column;
            max-width: ${variables.width};
            min-width: 210px;
            max-height: ${variables.heigth};
            padding: 10px 0 10px 0;
            border: 1px solid ${variables.grey};
            border-radius: 15px;
            background-color: white;
            font-family: Arial, Helvetica, sans-serif;
          `,
    header: `
            position: relative;
            box-sizing: border-box;
            padding-left: 15px;
            z-index: 3;
            border-bottom: .5px solid ${variables.grey};
            color: ${variables.softBlack};
            font-size: ${variables.headerFontSize};
          `,
    headerSmall: `
            color: ${variables.lightBlack};
            font-size: 14px;
          `,
    footer: `
            padding: 5px 0;
            border-top: .5px solid ${variables.grey};
            font-size: ${variables.mainFontSize};
            text-align: center;
            font-size: 14px;
            font-weight: bold;
          `,
    events: `
            overflow-y: auto;
            list-style: none;
            padding: 0;
            margin: 0;
          `,
    event: `
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 8px;
            font-size: ${variables.mainFontSize};
            border-top: 1px solid ${variables.grey};
            transition: .2s background-color;
            cursor: pointer;
          `,
    eventDetail: `
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: ${variables.mainFontSize};
          `,
    eventName: `
            color: ${variables.softBlack};
            text-decoration: none;
            font-weight: bold;
          `,
    date: `
            margin: 0;
            color: #505050;
            font-size: 12px;
          `,
    avatar:`
            width: ${variables.avatarSize};
            border: .8px solid ${variables.grey};
            border-radius: 50%;
          `,
  };
};

let styles = updateStyles(variables);

const timelines = document.getElementsByClassName('github-timeline');

// Read user information from GitHub
const getUserInfo = function (username) {
  return new Promise(function (res, rej) {
    try {
      fetch('https://api.github.com/users/' + username)
        .then(res => res.json())
        .then(data => {
          if (data.url) {
            res({
              type: 'user',
              isSuccess: true,
              data
            });
          } else {
            res({
              type: 'user',
              isSuccess: false,
              data

            });
          }
        });
    } catch (e) {
      rej(e);
    }
  });
};

// Read user events from GitHub
const getUserEvents = function (username) {
  return new Promise(function (res, rej) {
    try {
      fetch('https://api.github.com/users/' + username + '/events')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            res({
              type: 'events',
              isSuccess: true,
              data
            });
          } else {
            res({
              type: 'events',
              isSuccess: false,
              data
            });
          }
        });
    } catch (e) {
      rej(e);
    }
  });
};

// Create timeline basic html hierarchy
const createTimeline = function (timeline, user) {
  timeline.innerHTML = `
        <div style="${styles.header}">
          Github Events <small style="${styles.headerSmall}">by 
          <a
            style="color: rgb(61, 61, 255);font-size: 14px;"
            href="https://github.com/${user.login}"
            target="_blank"
          >
            @${user.login}
          </a>
        </small>
        </div>
        <ul style="${styles.events}">
          <!-- Events inject here -->
        </ul>
        `;
};

// Inject event components with user data to timeline
const injectEventComponents = function (timeline, user, events) {
  let eventList = timeline.childNodes[3];

  if(!events){
    eventList.innerHTML = '<p style="text-align:center; color: grey;">User not found an event</p>';
  }

  for (let event of events) {
    let dateFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      eventDate = new Date(event.created_at).toLocaleDateString('en-US', dateFormatOptions),
      ownerName = event.repo.name.split('/')[0].toLowerCase(),
      ownerAvatar = event.org ? event.org.avatar_url : event.actor.avatar_url;

    // Create new element
    let component = document.createElement('li');
    component.style = styles.event;
    component.innerHTML = `
            <div style="display: flex;flex-direction: column;align-content: center;justify-content: center;">
              <a 
                href="https://github.com/${ownerName}"
                title="${ownerName}"
              >
                <img 
                  src="${ownerAvatar}"
                  alt="User Avatar"
                  style="${styles.avatar}"
                >
              </a>
            </div>
            <div style="${styles.eventDetail}">
                <a 
                  href="https://github.com/${ownerName}"
                  style="margin:0; ${styles.eventName}"
                >
                  ${ownerName}
                </a>
              <p style="margin:0">
                ${user.name} ${event.payload.action ? event.payload.action : ''} ${event.type.replace('Event', '').split(/(?=[A-Z])/).join(' ').toLowerCase()}  
              </p>
              <a
                href="https://github.com/${event.repo.name}"
                style="margin:0;text-decoration: none; color: ${variables.softBlack}"
              >
                to: ${event.repo.name}
              </a>
            </div>
            <div style="display: flex;flex-direction: column;align-items: flex-end;justify-content: space-between">
              <p style="${styles.date}">
                ${eventDate}
              <p>
            </div>
          `;

    // Event component hover effect.
    component.addEventListener('mouseover', function () {
      component.style.backgroundColor = variables.hoverBacground;
    });
    component.addEventListener('mouseout', function () {
      component.style.backgroundColor = 'white';
    });

    // Event component 
    component.addEventListener('click', function () {
      window.open(`https://github.com/${event.repo.name}`, '_blank');
    });

    // Add event component to events
    eventList.appendChild(component);
  }

  // Add Hidden footer
  let footer = document.createElement('div');
  footer.style = styles.footer;
  footer.innerHTML = `
            Coded by <a href="https://github.com/saracalihan/" target="_blank">@saracalihan</a>`;
  eventList.appendChild(footer);
};

const rander = function (timeline, user, events) {
  if (user) {
    styles = updateStyles(variables);
    createTimeline(timeline, user);
    injectEventComponents(timeline, user, events);
  } else {
    errorUserNotFound(timeline);
  }
};

// Restyle timeline user grid and dynamic css variables
const resizeTimeline = function (timeline, user, events) {
  var isChange = false;
  if (timeline.clientWidth < 330) {
    variables.headerFontSize = '18px';
    variables.mainFontSize = '12px';
    variables.avatarSize = '30px';
    isChange = true;
  } else if (timeline.clientWidth < 425) {
    variables.headerFontSize = '24px';
    variables.mainFontSize = '14px';
    variables.avatarSize = '50px';
    isChange = true;
  } else if (timeline.clientWidth < 500) { //variables.width.replace('px','')
    variables = Object.create(defaultVariables);
    isChange = true;
  }

  if (isChange) {
    rander(timeline, user, events);
  }
};

const errorUserNotFound = function (timeline) {
  timeline.innerHTML = `<p style="text-align: center;margin: 5px;">'<strong>${timeline.dataset.username}</strong>' user not found!</p>`;
};

// >-----------| START POINT |------------<
// Get user personal data and events then
// Create and manipulate components
for (let timeline of timelines) {
  timeline.style = styles.main;
  let user = {}, events = [];

  Promise.all([
    getUserInfo(timeline.dataset.username),
    getUserEvents(timeline.dataset.username)
  ])
    .then(function (values) {
      // Set user and events into valuse array.
      // If value dont get succesfully return null
      user = values.find(v => v.type === 'user' && v.isSuccess) || null;
      events = values.find(v => v.type === 'events' && v.isSuccess) || null;

      user = user ? user.data : null;
      events = events ? events.data : null;

      rander(timeline, user, events);
      window.addEventListener('resize', function () {
        resizeTimeline(timeline, user, events);
      });
      resizeTimeline(timeline, user, events);
    });
}