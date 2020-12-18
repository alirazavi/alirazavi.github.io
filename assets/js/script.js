class Resume extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      summary: null };

    function getResume(url) {
      return new Promise((res, rej) => {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
          if (request.responseText) {
            var response = JSON.parse(request.responseText);
            res(response);
          } else {
            rej(Error('Error getting deck'));
          }
        };
        request.send();
      });
    }
    getResume('https://adamgiese.github.io/json/resume.json').then(response => {
      this.setState({
        name: response.info.name,
        summary: response.info.summary,
        experiences: response.experience,
        skills: response.skills,
        technologies: response.technologies });

    }, error => {
      console.log(error);
    });
  }
  render() {
    var name;
    if (_.has(this, 'state.resume.info.name')) {
      name = this.state.resume.info.name;
    }

    var experiences = [];
    if (_.has(this, 'state.experiences')) {
      this.state.experiences.forEach(function (experience) {
        experiences.push(
        React.createElement(Experience, {
          from: experience.from,
          until: experience.until,
          at: experience.employer,
          title: experience.title,
          tasks: experience.responsibilities }));


      });
    }

    var skills = [];
    if (_.has(this, 'state.skills')) {
      this.state.skills.forEach(function (skill) {
        skills.push(React.createElement("li", null, skill));
      });
    }

    var technologies = [];
    if (_.has(this, 'state.technologies')) {
      this.state.technologies.forEach(function (technology) {
        technologies.push(React.createElement("li", null, technology));
      });
    }

    return (
      React.createElement("div", { className: "resume" },
      React.createElement("h1", null, this.state.name),
      React.createElement("div", { className: "resume-body" },
      React.createElement("div", { className: "experiences" }, experiences),
      React.createElement("div", { className: "skills-and-tech" },
      React.createElement(Skills, { skills: skills }),
      React.createElement(Technologies, { technologies: technologies })))));




  }}


class Skills extends React.Component {
  render() {
    var skills = this.props.skills.map((skill) =>
    React.createElement("li", { className: "skill" }, skill));

    return (
      React.createElement("div", { className: "skills-container" },
      React.createElement("h2", null, "Skills"),
      React.createElement("ul", { className: "skills" }, skills)));


  }}


class Technologies extends React.Component {
  render() {
    var technologies = this.props.technologies.map((technology) =>
    React.createElement("li", { className: "technology" }, technology));

    return (
      React.createElement("div", { className: "technologies-container" },
      React.createElement("h2", null, "Techs"),
      React.createElement("ul", { className: "technologies" }, technologies)));


  }}


class Experience extends React.Component {
  render() {
    var tasks = this.props.tasks.map((task) =>
    React.createElement("li", { className: "experience-list-item" }, task));

    var at;
    if (this.props.at) {
      at = 'at';
    }
    return (
      React.createElement("div", { className: "experience" },
      React.createElement("h2", null, React.createElement("span", { className: "experience-title" }, this.props.title), " ", at, " ", React.createElement("span", { className: "experience-at" }, this.props.at)),
      React.createElement("span", { className: "experience-length" }, this.props.from, " - ", this.props.until),
      React.createElement("ul", { className: "experience-list" }, tasks)));


  }}


ReactDOM.render(React.createElement(Resume, null), document.getElementById('app'));