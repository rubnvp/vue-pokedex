function getUserFrameworks(user, frameworkIds) {
  const frameworks = [];
  frameworks.push(frameworkIds[user.id % frameworkIds.length]);
  if (user.id % 2) {
    frameworks.push(frameworkIds[(user.id + 1) % frameworkIds.length])
  }
  return frameworks;
}

const app = new Vue({
  el: '#app',
  data: {
    searchText: '',
    checkedFrameworks: [],
    users: [],
    COLOR: {
      "Vue": "#41B883",
      "React": "#00d8ff",
      "Angular": "#B52E31",
      "Aurelia": "#C92483",
      "Backbone": "#012A42",
      "Ember": "#f23819",
      "LitElement": "#59B0F9",
      "Svelte": "#FF3E00"
    },
  },
  computed: {
    filteredUsers() {
      return this.users
        .filter(user => user.login.toLowerCase().includes(this.searchText.toLowerCase()))
        .filter(user => !this.checkedFrameworks.length || user.frameworks.some(framework => this.checkedFrameworks.includes(framework)));
    },
  },
  methods: {
    removeUser(userToRemove) {
      this.users = this.users.filter(user => user !== userToRemove);
    },
  },
  created() {
    Promise.all([
      fetch('https://api.github.com/orgs/adalab/public_members?page=1').then(response => response.json()),
      fetch('https://api.github.com/orgs/adalab/public_members?page=2').then(response => response.json()),
      fetch('https://api.github.com/orgs/adalab/public_members?page=3').then(response => response.json()),
      fetch('https://api.github.com/orgs/adalab/public_members?page=4').then(response => response.json()),
      fetch('https://api.github.com/orgs/adalab/public_members?page=5').then(response => response.json()),
      // fetch('/data/users.json').then(response => response.json()), // use a json if blocked by github
    ])
      .then(userPages => {
        const users = userPages.flat();
        const frameworkIds = Object.keys(this.COLOR);
        this.users = users
          .map(user => ({
            ...user,
            frameworks: getUserFrameworks(user, frameworkIds),
          }));
      });
  }
})