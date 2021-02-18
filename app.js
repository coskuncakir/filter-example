const selectedFilters = [];

hideFilters();

const showFilters = (event) => {
  hideFilters();
  const id = `${event.target.attributes.id.value}-filters`;
  document.getElementById(id).style.display = 'flex';

  document.querySelector('#column2 .header').innerHTML = `Select ${
    document.getElementById(id).dataset.name
  }`;
};

document.querySelectorAll('.parent-filter').forEach((item) => {
  item.addEventListener('click', showFilters);
});

const removeFilter = (filter) => {
  selectedFilters.forEach((item, index, arr) => {
    if (item === filter) {
      arr.splice(index, 1);
    }
  });

  const checkbox = document.querySelectorAll(`input[value="${filter}"]`);
  checkbox.forEach((item) => (item.checked = false));

  document.getElementById(`selected-${filter}`).remove();
  showSelectedFiltersCount();
};

const selectFilter = (event) => {
  const filterName = event.target.name;
  const filterValue = event.target.value;
  if (event.target.checked) {
    // create element
    if (!selectedFilters.includes(filterValue)) {
      let label = document.createElement('label');
      label.setAttribute('id', `selected-${filterValue}`);
      label.append(filterValue);
      let button = document.createElement('button');
      button.addEventListener('click', () => {
        removeFilter(filterValue);
      });
      button.innerHTML = 'X';
      document.getElementById('column3').appendChild(label);
      label.appendChild(button);
    }
    selectedFilters.push(filterValue);

    showSelectedFiltersCount();
  } else {
    removeFilter(filterValue);
  }
};

document.querySelectorAll('input[type=checkbox]').forEach((item) => {
  item.addEventListener('change', selectFilter);
});

function hideFilters() {
  document.querySelectorAll('.filters').forEach((item) => {
    item.style.display = 'none';
  });
}

function showSelectedFiltersCount() {
  document.querySelector('#column3 .header').innerHTML =
    selectedFilters.length > 0
      ? `${selectedFilters.length} filters selected`
      : 'No filters selected';
}
/*
const config = [
  {
    id: 1,
    name: 'Platform',
    filters: [
      {
        name: 'Android',
        value: 'android',
      },
      {
        name: 'iOS',
        value: 'ios',
      },
    ],
  },
  {
    id: 2,
    name: 'User Property',
    filters: [
      {
        name: 'App Version',
        filters: ['3.2.3', '3.2.4'],
      },
      {
        name: 'Gender',
        filters: ['Male', 'Female'],
      },
    ],
  },
];

const selectedFilters = [];

const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');
const column3 = document.getElementById('column3');

const addToFilter = (event) => {
  if (event.target.checked) {
  }
};

const getSubFilters = (event) => {
  column2.innerHTML = '';
  const id = event.target.attributes.data.value;
  config.forEach((item) => {
    if (item.id == id) {
      item.filters.forEach((filter) => {
        let label = document.createElement('label');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', filter.value);
        checkbox.addEventListener('change', addToFilter);
        column2.appendChild(label);
        label.appendChild(checkbox);
        label.append(filter.name);
      });
    }
  });
};
 
config.forEach((item) => {
  let btn = document.createElement('button');
  btn.innerHTML = item.name;
  btn.setAttribute('data', `${item.id}`);
  btn.addEventListener('click', getSubFilters);
  column1.appendChild(btn);
});
*/
