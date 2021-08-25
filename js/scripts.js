// GitHub Timeline Component
// Author: Alihan SARAC
// Contact address: 
//   + Email: saracalihan@gmail.com
//   + Twitter: @saracaIlihan
//   + GitHub: saracalihan
// > 16.05.2021

// Import external css
const _style = document.createElement('link');
_style.setAttribute('rel', 'stylesheet');
_style.setAttribute('href', 'https://cdn.jsdelivr.net/gh/saracalihan/github-timeline/css/style.css');

document.head.appendChild(_style);

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
const createTimeline = function (timeline) {
  // Set theme
  let theme = timeline.dataset.theme ? timeline.dataset.theme : 'light';
  timeline.classList.add(theme);

  timeline.innerHTML = `
        <div class="header">
          Github Events <small class="header-small">by 
          <a
            style="color: rgb(61, 61, 255);font-size: 14px;"
            href="https://github.com/${timeline.dataset.username}"
            target="_blank"
          >
            @${timeline.dataset.username}
          </a>
        </small>
        </div>
        <ul class="events">
          <!-- Events inject here -->
        </ul>
        `;
};

// Inject event components with user data to timeline
const injectEventComponents = function (timeline, user, events) {
  let eventList = timeline.childNodes[3];
  console.log(user, events);
  if (!user || !events) {
    let text = !user ? 'User not found!' : 'Oops! We couldn\'t find any activity of the user';
    return eventList.innerHTML = `<p class="not-found">${text}</p>`;
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
    component.className = 'event';
    component.innerHTML = `
            <div style="display: flex;flex-direction: column;align-content: center;justify-content: center;">
              <a 
                href="https://github.com/${ownerName}"
                title="${ownerName}"
              >
                <img 
                  src="${ownerAvatar}"
                  alt="User Avatar"
                  class="avatar"
                >
              </a>
            </div>
            <div class="event-detail">
                <a 
                  href="https://github.com/${ownerName}"
                  class="event-name"
                >
                  ${ownerName}
                </a>
              <p style="margin:0">
                ${user.name} ${event.payload.action ? event.payload.action : ''} ${event.type.replace('Event', '').split(/(?=[A-Z])/).join(' ').toLowerCase()}  
              </p>
              <a
                href="https://github.com/${event.repo.name}"
                style="margin:0;text-decoration: none;"
              >
                to: ${event.repo.name}
              </a>
            </div>
            <div style="display: flex;flex-direction: column;align-items: flex-end;justify-content: space-between">
              <p class="date">
                ${eventDate}
              <p>
            </div>
          `;

    // Event component 
    component.addEventListener('click', function () {
      window.open(`https://github.com/${event.repo.name}`, '_blank');
    });

    // Add event component to events
    eventList.appendChild(component);
  }

  // Add Hidden footer
  let footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = 'Coded by <a href="https://github.com/saracalihan/" target="_blank">@saracalihan</a>';
  eventList.appendChild(footer);
};

const rander = function (timeline, user, events) {
  createTimeline(timeline);
  injectEventComponents(timeline, user, events);
};

// >-----------| START POINT |------------<
// Get user personal data and events then
// Create and manipulate components
for (let timeline of timelines) {
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
    });
}